import { Router } from "express";
import { db } from "../db.js";
import { users } from "../../shared/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";

const router = Router();

// In-memory user storage for development without database
let inMemoryUsers = [];
let userIdCounter = 1;

// Helper to check if using in-memory storage
const useInMemory = !db;

// Register
router.post("/register", async (req, res) => {
    try {
        const { username, password, email, role = "client" } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        if (useInMemory) {
            // In-memory storage
            const existingUser = inMemoryUsers.find(u => u.username === username || u.email === email);
            if (existingUser) {
                return res.status(400).json({ message: "Username or email already exists" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = {
                id: String(userIdCounter++),
                username,
                password: hashedPassword,
                email,
                role
            };

            inMemoryUsers.push(newUser);
            req.session.userId = newUser.id;

            const { password: _, ...userWithoutPassword } = newUser;
            return res.json(userWithoutPassword);
        }

        // Database storage
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

        if (existingUser.length > 0) {
            return res.status(400).json({ message: "Username already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const [newUser] = await db
            .insert(users)
            .values({
                username,
                password: hashedPassword,
                email,
                role
            })
            .returning();

        req.session.userId = newUser.id;
        const { password: _, ...userWithoutPassword } = newUser;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Missing username or password" });
        }

        if (useInMemory) {
            // In-memory storage
            const user = inMemoryUsers.find(u => u.username === username);
            if (!user) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: "Invalid credentials" });
            }

            req.session.userId = user.id;
            const { password: _, ...userWithoutPassword } = user;
            return res.json(userWithoutPassword);
        }

        // Database storage
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.username, username))
            .limit(1);

        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        req.session.userId = user.id;
        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Get current user
router.get("/me", async (req, res) => {
    try {
        if (!req.session.userId) {
            return res.status(401).json({ message: "Not authenticated" });
        }

        if (useInMemory) {
            // In-memory storage
            const user = inMemoryUsers.find(u => u.id === req.session.userId);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const { password: _, ...userWithoutPassword } = user;
            return res.json(userWithoutPassword);
        }

        // Database storage
        const [user] = await db
            .select()
            .from(users)
            .where(eq(users.id, req.session.userId))
            .limit(1);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const { password: _, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
    } catch (error) {
        console.error("Auth check error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Logout
router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({ message: "Logout failed" });
        }
        res.json({ message: "Logged out successfully" });
    });
});

export default router;

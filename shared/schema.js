import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull().default("client") // client, professional, admin
});

const services = pgTable("services", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description"),
  price: text("price"),
  duration: text("duration").notNull(), // in minutes
  category: text("category").notNull()
});

const bookings = pgTable("bookings", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull(),
  serviceId: varchar("service_id").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  status: text("status").notNull().default("pending"), // pending, confirmed, cancelled, rescheduled
  notes: text("notes")
});

const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  role: true
});

const insertBookingSchema = createInsertSchema(bookings).pick({
  userId: true,
  serviceId: true,
  date: true,
  time: true,
  notes: true
});

export {
  users,
  services,
  bookings,
  insertUserSchema,
  insertBookingSchema
};

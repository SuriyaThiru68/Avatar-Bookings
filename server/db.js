import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';

const { Pool } = pg;

// Use in-memory storage if no database URL is provided
const DATABASE_URL = process.env.DATABASE_URL;

let db;

if (DATABASE_URL) {
    const pool = new Pool({
        connectionString: DATABASE_URL,
    });
    db = drizzle(pool);
} else {
    console.warn('⚠️  No DATABASE_URL found. Authentication will use in-memory storage (data will be lost on restart).');
    // Create a mock db object for development without a database
    db = null;
}

export { db };

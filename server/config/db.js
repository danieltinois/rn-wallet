import { neon } from "@neondatabase/serverless";

import "dotenv/config";

// Create a Neon database client using the connection string from environment variables
export const sql = neon(process.env.DATABASE_URL);

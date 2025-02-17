import dotenv from "dotenv";
import pg from "pg"
dotenv.config();

const pool = new pg.Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: parseInt(process.env.DB_PORT || "5432"),
});

pool.connect((err) => {
  if (err) return console.error(`Error connecting to the database:`, err.stack);

  console.log(`[INFO]: Connected to database`);
});

export default pool;

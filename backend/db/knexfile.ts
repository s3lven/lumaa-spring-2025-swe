import type { Knex } from "knex";
import dotenv from "dotenv";

dotenv.config({ path: "../.env" });

console.log(process.env.PG_CONNECTION_STRING);

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      connectionString: process.env.PG_CONNECTION_STRING || "",
      host: process.env.DB_HOST || "localhost",
      user: process.env.DB_USER || "your_username",
      database: process.env.DB_NAME || "your_database",
      password: process.env.DB_PASSWORD || "your_password",
      port: parseInt(process.env.DB_PORT || "5432"),
    },
    migrations: {
      directory: "./migrations",
      extension: "ts",
    },
  },
};

export default config;

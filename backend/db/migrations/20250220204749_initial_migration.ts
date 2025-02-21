import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  // Create the tasks table
  await knex.schema.createTable("tasks", (table) => {
    table.increments("id").primary();
    table.string("title", 100).notNullable();
    table.text("description");
    table.boolean("is_complete").notNullable().defaultTo(false);
  });

  // Create the users table
  await knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("username", 255).notNullable().unique();
    table.string("password", 255).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  // Drop tables in reverse order to avoid dependency issues
  await knex.schema.dropTableIfExists("users");
  await knex.schema.dropTableIfExists("tasks");
}

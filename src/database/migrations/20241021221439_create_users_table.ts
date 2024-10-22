/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.users);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.users);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.users,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('name', 129).notNullable();
      tableBuilder.string('email').notNullable().unique();
      tableBuilder.string('password').nullable();
      tableBuilder.string('registration_provider').nullable();
      tableBuilder.string('pic_url').nullable();

      tableBuilder.timestamps(true, true);
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.users);
}

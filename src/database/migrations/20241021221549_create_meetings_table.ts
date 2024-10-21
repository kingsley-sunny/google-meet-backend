/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.meetings);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.meetings);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.meetings,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('name').notNullable();
      tableBuilder.string('link').notNullable().unique();

      tableBuilder
        .bigint('user_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.users)
        .onDelete('CASCADE');
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.users);
}

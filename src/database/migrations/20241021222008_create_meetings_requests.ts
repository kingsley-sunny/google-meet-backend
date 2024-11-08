/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(
    DATABASE_TABLES.meeting_requests,
  );

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.meeting_requests);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.meeting_requests,
    (tableBuilder) => {
      tableBuilder
        .uuid('id')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('name').nullable();
      tableBuilder.string('status').notNullable();

      tableBuilder
        .uuid('user_id')
        .nullable()
        .references('id')
        .inTable(DATABASE_TABLES.users)
        .onDelete('CASCADE');

      tableBuilder
        .uuid('meeting_id')
        .notNullable()
        .references('id')
        .inTable(DATABASE_TABLES.meetings)
        .onDelete('CASCADE');
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.users);
}

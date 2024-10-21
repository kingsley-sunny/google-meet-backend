/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(
    DATABASE_TABLES.meeting_invites,
  );

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.meeting_invites);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.meeting_invites,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('name').nullable();
      tableBuilder.string('status').notNullable();

      tableBuilder
        .bigint('user_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.users)
        .onDelete('CASCADE');

      tableBuilder
        .bigint('meeting_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.meetings)
        .onDelete('CASCADE');
    },
  );
}

export async function down(knex: Knex): Promise<void> {
  return await knex.schema.dropTable(DATABASE_TABLES.users);
}

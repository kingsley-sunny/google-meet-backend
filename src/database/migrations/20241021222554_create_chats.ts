/* eslint-disable prettier/prettier */
import { Knex } from 'knex';
import { DATABASE_TABLES } from '../database.tables';

export async function up(knex: Knex): Promise<void> {
  const isTableExists = await knex.schema.hasTable(DATABASE_TABLES.chats);

  if (isTableExists) {
    knex.schema.dropTable(DATABASE_TABLES.chats);
  }

  return await knex.schema.createTable(
    DATABASE_TABLES.chats,
    (tableBuilder) => {
      tableBuilder.bigIncrements('id').unique().primary().notNullable();
      tableBuilder
        .uuid('uuid')
        .notNullable()
        .unique()
        .defaultTo(knex.raw('(UUID())'));

      tableBuilder.string('user_name').nullable();
      tableBuilder.text('message').notNullable();

      tableBuilder
        .bigint('user_id')
        .nullable()
        .unsigned()
        .references('id')
        .inTable(DATABASE_TABLES.users)
        .onDelete('RESTRICT');

      tableBuilder
        .bigint('temporary_user_id')
        .nullable()
        .unsigned()
        .references('temporary_user_id')
        .inTable(DATABASE_TABLES.meeting_users)
        .onDelete('RESTRICT');

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

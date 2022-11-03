import { Knex } from 'knex';

export function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at');

    table.enum('type', ['normal', 'artist']).defaultTo('normal');
    table.string('name').notNullable();
    table.string('username').notNullable().unique();
    table.string('email').notNullable().unique();
    table.string('bio');
    table.string('avatar');

    table.index(['type']);
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('users');
}

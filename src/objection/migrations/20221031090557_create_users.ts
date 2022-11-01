import {Knex} from 'knex'

export function up(knex: Knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').unsigned().primary();
    table.dateTime('created_at').notNullable();
    table.dateTime('updated_at');

    table.enum('type', ['normal', 'artist']).defaultTo('normal');
    table.string('name').notNullable();
    table.string('username').notNullable().unique('user_username');
    table.string('email').notNullable().unique('user_email');
    table.json('social_links');
    table.string('bio');
    table.string('avatar');
  });
}

export function down(knex: Knex) {
  return knex.schema.dropTable('users');
}

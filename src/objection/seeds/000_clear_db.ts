import { Knex } from 'knex';

export async function seed(knex: Knex) {
  await truncateAllTables(knex);
}

const truncateTablesSQL = `SELECT Concat('TRUNCATE TABLE "' ,table_schema, '"."', TABLE_NAME, '" RESTART IDENTITY CASCADE;') truncate_table_cmd
FROM INFORMATION_SCHEMA.TABLES
WHERE table_schema = (SELECT current_schema())
  AND table_type = 'BASE TABLE'
  AND TABLE_NAME NOT LIKE 'knex_%'
`;

export async function truncateAllTables(knex) {
  const sqlQuery = await knex.raw(truncateTablesSQL);
  const truncateQuery = sqlQuery.rows
    .map((sql) => sql.truncate_table_cmd)
    .join('\n');

  await knex.raw(truncateQuery);
}

import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `${__dirname}/../../${process.env.NODE_ENV}.env` });

const knex = {
  client: 'postgresql',
  connection: process.env.DATABASE_URL || 'postgresql://user:password@db:5432/usersearch?schema=public',
  migrations: {
    directory: `${__dirname}/../objection/migrations`,
    tableName: 'knex_migrations',
  },
  seeds: {
    run: Boolean(process.env.SEED_ON_DEPLOY),
    directory: `${__dirname}/../objection/seeds`,
  },
  pool: {
    min: +process.env.MIN_CONNECTION_POOL || 4,
    max: +process.env.MAX_CONNECTION_POOL || 30,
  },
};

const port = +process.env.PORT || 3000;

export default {
  knex,
  port,
};

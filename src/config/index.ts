import dotenv from 'dotenv';

dotenv.config();
dotenv.config({ path: `${__dirname}/../../${process.env.NODE_ENV}.env` });

let connection;
if (process.env.NODE_ENV === 'development') {
  connection =
    process.env.DATABASE_URL ||
    'postgresql://user:password@db:5432/usersearch?schema=public';
} else {
  connection = {
    connectionString:
      process.env.DATABASE_URL ||
      'postgresql://user:password@db:5432/usersearch?schema=public',
    ssl: { rejectUnauthorized: false },
  };
}

const knex = {
  client: 'postgresql',
  connection,
  migrations: {
    directory: `${__dirname}/../objection/migrations`,
    tableName: 'knex_migrations',
  },
  seeds: {
    run: process.env.SEED_ON_DEPLOY,
    directory: `${__dirname}/../objection/seeds`,
  },
  pool: {
    min: +process.env.MIN_CONNECTION_POOL || 4,
    max: +process.env.MAX_CONNECTION_POOL || 30,
  },
};

const redis = {
  url: process.env.REDIS_URL,
  cacheTime: +process.env.REDIS_CACHE_TIME,
};

const port = +process.env.PORT || 3000;

export default {
  knex,
  port,
  redis,
};

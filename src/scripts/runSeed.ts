// command:
// $ npx ts-node src/scripts/runSeed.ts
// PS: usersearch_db container must be up running

import bunyan from 'bunyan';
import Knex from 'knex';
import { Model } from 'objection';

import config from '../config';

export const dbLogger = bunyan.createLogger({ name: 'runSeed' });

let knexConnection: any;
async function start() {
  knexConnection = Knex(config.knex);
  Model.knex(knexConnection);
  dbLogger.info('DB connected...');

  dbLogger.info('Running knex seeds...');
  await knexConnection.seed.run(config.knex.seeds);
  dbLogger.info('Done running knex seeds.');
  
  await disconnect();
  dbLogger.info('DB disconnected');
}

async function disconnect() {
  return knexConnection?.destroy();
}

start();
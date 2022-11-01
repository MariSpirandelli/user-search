import bunyan from 'bunyan';
import Knex from 'knex';
import { Model } from 'objection';

import config from '../config';

export const dbLogger = bunyan.createLogger({ name: 'db' });

let knexConnection: any;

export default {
  async connect(runSeed: boolean = false) {
    knexConnection = Knex(config.knex);
    Model.knex(knexConnection);

    dbLogger.info('Running knex migrations...');
    await knexConnection.migrate.latest();
    dbLogger.info('Done running knex migrations.');

    if (!runSeed) {
      return;
    }

    dbLogger.info('Running knex seeds...');
    await knexConnection.seed.run(config.knex.seeds);
    dbLogger.info('Done running knex seeds.');
  },
  disconnect() {
    return knexConnection?.destroy();
  },
};

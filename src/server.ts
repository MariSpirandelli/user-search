import bunyan from 'bunyan';
import config from './config';
import api from './express/index';
import objection from './objection';

const logger = bunyan.createLogger({ name: 'server' });

process.on('uncaughtException', (err) => {
  logger.error('[UncaughtException] SERVER ERROR:', err);

  // prevent undefined state of the application
  process.exit(-500);
});

process.on('unhandledRejection', (err: any, promise) =>
  logger.error('[UnhandledRejection]', err.message, '\n', err, promise)
);

const exitSignalHandler = (arg: any) => {
  logger.info('Exit code received', arg);
  objection.disconnect();
};
process.on('SIGINT', exitSignalHandler);
process.on('SIGUSR1', exitSignalHandler);
process.on('SIGUSR2', exitSignalHandler);

logger.info('[STARTING] Server process at UTC:', new Date());

objection.connect(config.knex.seeds.run).then(() => {
  const app = api();

  app.listen(config.port, () => {
    logger.info(`Server running on http://localhost:${config.port}/`);
  });
});
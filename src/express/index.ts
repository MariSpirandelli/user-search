import cors from 'cors';
import express from 'express';
import helmet from 'helmet';

import errorHandler from './errorHandler';
import requestLogger from './requestLogger';
import routes from './routes';

export default function api() {
  const app = express();
  app.enable('trust proxy');

  app.use(
    cors({
      credentials: true,
      origin: true,
    })
  );

  app.use(helmet());
  app.use(requestLogger());

  app.use('/status', (_, res) => res.send({ ok: true }));

  app.use('/api', routes);

  app.use(errorHandler);

  return app;
}

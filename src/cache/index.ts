import bunyan from 'bunyan';
import { createClient, RedisClientType } from 'redis';
import config from '../config';

const logger = bunyan.createLogger({ name: 'cache' });

class Cache {
  client: RedisClientType;
  constructor() {
    this.client = createClient({ url: config.redis.url });
    this.client.connect();

    this.client.on('connect', () => {
      logger.info('Redis Connected!');
      logger.info(this.client);
    });
    this.client.on('error', (err) => {
      logger.error('Redis error');
      logger.error(err);
    });
  }

  getByKey(key: string) {
    return this.client.get(key);
  }

  set(key: string, value: string) {
    return this.client.setEx(key, config.redis.cacheTime, value);
  }
}

const cache = new Cache();
export default cache;

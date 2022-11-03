import bunyan from 'bunyan';
import crypto from 'crypto';
import { Page } from 'objection';
import cache from '../cache';
import { User } from '../objection/models/user';
import { UserFilter, UserInput } from '../types/user';

const logger = bunyan.createLogger({ name: 'core::users' });

export default class Users {
  static async create(user: UserInput) {
    const newUser = await User.query().insert(user).returning('*');

    return newUser;
  }

  static update({ id, ...userData }: Partial<User>) {
    return User.query().update(userData).where('id', id).returning('*');
  }

  /**
   * Get user by Id
   * @param id
   * @returns
   */
  static get(id: number) {
    return User.query().where('id', id).first();
  }

  /**
   * Get all users by pages attending filters specifications
   * @param filters
   * @returns
   */
  static async getUsers(filters: UserFilter): Promise<Page<User>> {
    const key = crypto
      .createHash('md5')
      .update(JSON.stringify(filters))
      .digest('hex');
    const cached = await cache.getByKey(key);
    if (cached) {
      logger.info(`Cached value found. Returning cached...`);

      return JSON.parse(cached);
    }
    const { page, pageSize, type, search } = filters;
    logger.info(`Cached value NOT found. Loading from DB...`);
    const queryBuilder = User.query().select().page(page, pageSize);

    if (type) {
      queryBuilder.where('type', type);
    }

    if (search) {
      const searchTerm = `%${search.toLowerCase()}%`;
      queryBuilder.where((searchBuilder) =>
        searchBuilder
          .whereRaw('LOWER(name) ilike ?', searchTerm)
          .orWhere('email', 'ilike', searchTerm)
          .orWhereRaw('LOWER(username) ilike ?', searchTerm)
      );
    }

    const newCacheResult = await queryBuilder;

    logger.info(`Caching results...`);
    await cache.set(key, JSON.stringify(newCacheResult));
    logger.info(`Returning results...`);

    return newCacheResult;
  }
}

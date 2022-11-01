import { QueryBuilder } from 'objection';
import { User } from '../objection/models/user';
import { UserFilter, UserInput } from '../types/user';

export default class Users {
  static async create(user: UserInput) {
    const newUser = await User.query().insert(user).returning('*');

    return newUser;
  }

  static update({ id, ...userData }: Partial<User>) {
    return User.query().update(userData).where('id', id).returning('*');
  }

  static get(id: number) {
    return User.query().where('id', id).first();
  }

  
  static getUsers(filters: UserFilter): QueryBuilder<User, User[]> {
    return User.query().where('id', filters.search).select();
  }

  
}

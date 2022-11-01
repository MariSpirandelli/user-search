import { SocialLink, UserType } from '../../types/user';
import BaseModel from './baseModel';

export class User extends BaseModel {
  type: UserType;
  name: string;
  username: string;
  email: string;
  socialLinks?: SocialLink[];
  bio?: string;
  avatar?: string;

  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        socialLinks: {
          type: 'array',
          items: { type: 'object' },
        },
      },
    };
  }
}

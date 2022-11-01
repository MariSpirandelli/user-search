import { User } from '../objection/models/user';

declare type UserInput = Pick<
  User,
  'name' | 'username' | 'email' | 'socialLinks' | 'bio' | 'avatar'
>;

export type UserType = 'normal' | 'artist';

export interface SocialLink {
    name: string;
    value: string;
  }

declare type UserFilter = {
  page: number;
  pageSize: number;
  search: string;
};


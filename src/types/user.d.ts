import { User } from '../objection/models/user';

declare type UserInput = Pick<
  User,
  'name' | 'username' | 'email' | 'bio' | 'avatar'
>;

export type UserType = 'normal' | 'artist';

declare type UserFilter = {
  page: number;
  pageSize: number;
  search: string;
  type: UserType;
};


import { UserModel } from '../../../database/models/user/user.model';

export type TokenPayload = Pick<UserModel, 'id' | 'email'> & {
  iat?: number;
  aud: string;
};

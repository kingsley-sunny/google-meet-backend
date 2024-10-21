import { IBase } from '../../base/base.interface';

export interface IUser extends IBase {
  name: string;
  email: string;
  password: string;
}

import { IBase } from '../../base/base.interface';

export interface IMeetingUser extends IBase {
  meeting_id: number;
  user_id: number;
  name: string;
  temporary_user_id: string;
  meeting_token: string;
}

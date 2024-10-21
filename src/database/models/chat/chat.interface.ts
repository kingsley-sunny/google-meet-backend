import { IBase } from '../../base/base.interface';

export interface IChat extends IBase {
  meeting_id: number;
  user_id: number;
  temporary_user_id: string;
  user_name: string;
  message: string;
}

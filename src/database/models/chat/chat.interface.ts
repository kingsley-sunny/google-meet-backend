import { IBase } from '../../base/base.interface';

export interface IChat extends IBase {
  meeting_id: string;
  user_id: string;
  user_name: string;
  message: string;
}

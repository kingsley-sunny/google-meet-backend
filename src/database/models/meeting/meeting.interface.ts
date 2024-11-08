import { IBase } from '../../base/base.interface';

export interface IMeeting extends IBase {
  name: string;
  user_id: string;
  token: string;
}

import { IBase } from '../../base/base.interface';

export interface IMeeting extends IBase {
  name: string;
  link: string;
  user_id: number;
}

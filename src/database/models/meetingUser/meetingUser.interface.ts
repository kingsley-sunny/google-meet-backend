import { IBase } from '../../base/base.interface';

export enum MeetingUserStatus {
  active = 'active',
  inActive = 'inActive',
}

export interface IMeetingUser extends IBase {
  meeting_id: number;
  user_id: number;
  name: string;
  temporary_user_id: string;
  status: keyof typeof MeetingUserStatus;
}

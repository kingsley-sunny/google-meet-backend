import { IBase } from '../../base/base.interface';

export enum MeetingUserStatus {
  active = 'active',
  inActive = 'inActive',
}

export interface IMeetingUser extends IBase {
  meeting_id: string;
  name: string;

  user_id: string;
  status: keyof typeof MeetingUserStatus;
}

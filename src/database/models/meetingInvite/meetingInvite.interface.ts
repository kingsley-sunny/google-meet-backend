import { IBase } from '../../base/base.interface';

export enum InviteStatus {
  waiting = 'waiting',
  rejected = 'rejected',
  approved = 'approved',
}

export interface IMeetingInvite extends IBase {
  meeting_id: number;
  status: keyof typeof InviteStatus;
  user_id: number;
  name: string;
}

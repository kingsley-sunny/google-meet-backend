import { IBase } from '../../base/base.interface';

export enum RequestStatus {
  waiting = 'waiting',
  rejected = 'rejected',
  approved = 'approved',
}

export interface IMeetingRequest extends IBase {
  meeting_id: string;
  status: keyof typeof RequestStatus;
  user_id: string;
  name: string;
}

import { IsEnum } from 'class-validator';
import { InviteStatus } from '../../../database/models/meetingInvite/meetingInvite.interface';

export class UpdateMeetingInviteDto {
  @IsEnum(InviteStatus)
  status: keyof typeof InviteStatus;
}

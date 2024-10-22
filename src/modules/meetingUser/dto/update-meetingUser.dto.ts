import { IsEnum } from 'class-validator';
import { MeetingUserStatus } from '../../../database/models/meetingUser/meetingUser.interface';

export class UpdateMeetingUserDto {
  @IsEnum(MeetingUserStatus)
  status: keyof typeof MeetingUserStatus;
}

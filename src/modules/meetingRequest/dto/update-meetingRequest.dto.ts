import { IsEnum } from 'class-validator';
import { RequestStatus } from '../../../database/models/meetingRequest/meetingRequest.interface';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { MeetingRepository } from '../../meeting/meeting.repository';
import { MeetingRequestRepository } from '../meetingRequest.repository';

export class UpdateMeetingRequestDto {
  @IsExistsIn('id', new MeetingRepository())
  meeting_id: string;

  @IsExistsIn('id', new MeetingRequestRepository())
  id: string;

  @IsEnum(RequestStatus)
  status: keyof typeof RequestStatus;
}

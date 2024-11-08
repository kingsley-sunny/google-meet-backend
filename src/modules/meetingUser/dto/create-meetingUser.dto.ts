import { Length } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { MeetingRepository } from '../../meeting/meeting.repository';

export class CreateMeetingUserDto {
  @IsExistsIn('id', new MeetingRepository())
  meeting_id: string;

  @Length(3)
  name: string;
}

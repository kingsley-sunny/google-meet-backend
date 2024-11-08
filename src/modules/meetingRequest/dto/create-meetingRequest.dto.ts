import { IsString, ValidateIf } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { MeetingRepository } from '../../meeting/meeting.repository';
export class CreateMeetingRequestDto {
  @IsExistsIn('id', new MeetingRepository())
  meeting_id: string;

  @IsString()
  @ValidateIf((o) => !o.user_id)
  name: string;

  // @Optional()
  // @IsExistsIn('id', new UserRepository())
  // meeting_user_id: string;
}

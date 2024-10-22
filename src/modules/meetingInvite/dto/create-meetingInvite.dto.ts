import { IsString, ValidateIf } from 'class-validator';
import { IsExistsIn } from '../../../decorators/IsExistsIn.decorator';
import { MeetingRepository } from '../../meeting/meeting.repository';
import { UserRepository } from '../../user';

export class CreateMeetingInviteDto {
  @IsExistsIn('id', new MeetingRepository())
  meeting_id: number;

  @IsString()
  @ValidateIf((o) => !o.user_id)
  name: string;

  @ValidateIf((o) => !o.name)
  @IsExistsIn('id', new UserRepository())
  user_id: number;
}

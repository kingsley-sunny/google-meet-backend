import { BaseRepository } from '../../database/base/base.repository';
import { IMeetingUser } from '../../database/models/meetingUser/meetingUser.interface';
import { MeetingUserModel } from '../../database/models/meetingUser/meetingUser.model';

export class MeetingUserRepository extends BaseRepository<
  Partial<IMeetingUser>
> {
  constructor() {
    super(MeetingUserModel);
  }
}

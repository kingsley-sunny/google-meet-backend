import { BaseRepository } from '../../database/base/base.repository';
import { IMeetingInvite } from '../../database/models/meetingInvite/meetingInvite.interface';
import { MeetingInviteModel } from '../../database/models/meetingInvite/meetingInvite.model';

export class MeetingInviteRepository extends BaseRepository<
  Partial<IMeetingInvite>
> {
  constructor() {
    super(MeetingInviteModel);
  }
}

import { BaseRepository } from '../../database/base/base.repository';
import { IMeeting } from '../../database/models/meeting/meeting.interface';
import { MeetingModel } from '../../database/models/meeting/meeting.model';

export class MeetingRepository extends BaseRepository<Partial<IMeeting>> {
  constructor() {
    super(MeetingModel);
  }
}

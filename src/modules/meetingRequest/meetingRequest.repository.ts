import { BaseRepository } from '../../database/base/base.repository';
import { IMeetingRequest } from '../../database/models/meetingRequest/meetingRequest.interface';
import { MeetingRequestModel } from '../../database/models/meetingRequest/meetingRequest.model';

export class MeetingRequestRepository extends BaseRepository<
  Partial<IMeetingRequest>
> {
  constructor() {
    super(MeetingRequestModel);
  }
}

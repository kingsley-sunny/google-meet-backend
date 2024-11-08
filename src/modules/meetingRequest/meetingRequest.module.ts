import { forwardRef, Module } from '@nestjs/common';
import { MeetingModule } from '../meeting/meeting.module';
import { MeetingUserModule } from '../meetingUser/meetingUser.module';
import { meetingRequestController } from './meetingRequest.controller';
import { MeetingRequestGateway } from './meetingRequest.gateway';
import { MeetingRequestRepository } from './meetingRequest.repository';
import { MeetingRequestService } from './meetingRequest.service';

@Module({
  controllers: [meetingRequestController],
  exports: [MeetingRequestService, MeetingRequestRepository],
  providers: [
    MeetingRequestService,
    MeetingRequestRepository,
    MeetingRequestGateway,
  ],
  imports: [forwardRef(() => MeetingModule), MeetingUserModule],
})
export class MeetingRequestModule {}

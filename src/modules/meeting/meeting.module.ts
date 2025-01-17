import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MeetingRequestModule } from '../meetingRequest/meetingRequest.module';
import { MeetingController } from './meeting.controller';
import { MeetingGateway } from './meeting.gateway';
import { MeetingRepository } from './meeting.repository';
import { MeetingService } from './meeting.service';

@Module({
  controllers: [MeetingController],
  exports: [MeetingService, MeetingRepository],
  providers: [MeetingService, MeetingRepository, MeetingGateway],
  imports: [forwardRef(() => MeetingRequestModule), JwtModule],
})
export class MeetingModule {}

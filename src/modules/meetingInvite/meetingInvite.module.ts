import { Module } from '@nestjs/common';
import { MeetingInviteController } from './meetingInvite.controller';
import { MeetingInviteRepository } from './meetingInvite.repository';
import { MeetingInviteService } from './meetingInvite.service';

@Module({
  controllers: [MeetingInviteController],
  exports: [MeetingInviteService],
  providers: [MeetingInviteService, MeetingInviteRepository],
})
export class MeetingModule {}

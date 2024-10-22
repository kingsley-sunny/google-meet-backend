import { Module } from '@nestjs/common';
import { MeetingUserController } from './meetingUser.controller';
import { MeetingUserRepository } from './meetingUser.repository';
import { MeetingUserService } from './meetingUser.service';

@Module({
  controllers: [MeetingUserController],
  exports: [MeetingUserService],
  providers: [MeetingUserService, MeetingUserRepository],
})
export class MeetingModule {}

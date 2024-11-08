import { forwardRef, Module } from '@nestjs/common';
import { MeetingModule } from '../meeting/meeting.module';
import { UserModule } from '../user/user.module';
import { MeetingUserController } from './meetingUser.controller';
import { MeetingUserRepository } from './meetingUser.repository';
import { MeetingUserService } from './meetingUser.service';

@Module({
  controllers: [MeetingUserController],
  exports: [MeetingUserService, MeetingUserRepository],
  providers: [MeetingUserService, MeetingUserRepository],
  imports: [forwardRef(() => MeetingModule), UserModule],
})
export class MeetingUserModule {}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MeetingController } from './meeting.controller';
import { MeetingRepository } from './meeting.repository';
import { MeetingService } from './meeting.service';

@Module({
  controllers: [MeetingController],
  exports: [MeetingService],
  providers: [MeetingService, MeetingRepository],
  imports: [JwtModule],
})
export class MeetingModule {}

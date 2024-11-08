import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthModule } from './modules/auth/auth.module';
import { MeetingModule } from './modules/meeting/meeting.module';
import { MeetingRequestModule } from './modules/meetingRequest/meetingRequest.module';
import { MeetingUserModule } from './modules/meetingUser/meetingUser.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    DatabaseModule,
    MeetingModule,
    MeetingRequestModule,
    MeetingUserModule,
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}

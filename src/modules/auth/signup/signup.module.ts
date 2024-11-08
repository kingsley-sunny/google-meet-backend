import { Module } from '@nestjs/common';
import { SignUpController } from './signup.controller';
import { SignUpService } from './signup.service';
import { UserModule } from '../../user/user.module';

@Module({
  controllers: [SignUpController],
  providers: [SignUpService],
  imports: [UserModule],
})
export class SignUpModule {}

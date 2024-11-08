import { Module } from '@nestjs/common';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';
import { UserModule } from '../../user/user.module';

@Module({
  controllers: [LoginController],
  providers: [LoginService],
  imports: [UserModule],
})
export class LoginModule {}

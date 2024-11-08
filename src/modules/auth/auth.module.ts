import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';

import { EnvironmentService } from '../../config/environment/environment.service';
import { UserModule } from '../user/user.module';
import { UserRepository } from '../user/user.repository';
import { LoginController } from './login/login.controller';
import { LoginModule } from './login/login.module';
import { LoginService } from './login/login.service';
import { SignUpController } from './signup/signup.controller';
import { SignUpModule } from './signup/signup.module';
import { SignUpService } from './signup/signup.service';
import { JwtStrategy } from './strategies/jwt.strategy.service';
import { LocalStrategy } from './strategies/local.strategy';
@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: EnvironmentService.getValue('jwtSecretToken'),
      signOptions: { expiresIn: '7days' },
    }),
  ],
  providers: [
    SignUpModule,
    AuthService,
    LoginModule,
    LocalStrategy,
    LoginService,
    SignUpService,
    JwtStrategy,
    UserRepository,
  ],
  controllers: [LoginController, SignUpController],
})
export class AuthModule {}

import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserPasswordOption } from '../../database/models/user/userPasswordOption';
import { UtilsService } from '../../utils/utils.service';
import { UserService } from '../user';

@Injectable()
export class AuthService {
  @Inject(UserService)
  userService: UserService;

  async validateUser(username: string, password: string): Promise<any> {
    Logger.log('validateUser', 'AuthService');

    UserPasswordOption.showPassword();
    const user = await this.userService.findUserWithEmail(username);

    if (!user) {
      throw new NotFoundException('User do not exists');
    }

    if (user.registration_provider === 'google') {
      throw new ConflictException(
        'This account is already registered with Google, Sign in with google instead',
      );
    }

    const isPasswordMatched = await UtilsService.comparePassword(
      password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new BadRequestException('Password is incorrect');
    }

    delete user.password;

    return user;
  }
}

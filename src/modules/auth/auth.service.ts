import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { UserPasswordOption } from '../../database/models/user/userPasswordOption';
import { UtilsService } from '../../utils/utils.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  @Inject(UserService)
  userService: UserService;

  async validateUser(username: string, password: string): Promise<any> {
    Logger.log('validateUser', 'AuthService');

    UserPasswordOption.showPassword();
    const user = await this.userService.findUserWithEmail(username);
    console.log('🚀 ~~ AuthService ~~ validateUser ~~ user:', user);

    if (!user) {
      throw new NotFoundException('User do not exists');
    }

    if (user.registration_provider === 'google') {
      return user;
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

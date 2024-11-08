import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUser } from '../../../database/models/user/user.interface';
import { CreateUserDto } from '../../user/dto/create-user.dto';
import { UserService } from '../../user/user.service';

@Injectable()
export class SignUpService {
  @Inject(UserService)
  userService: UserService;
  @Inject(JwtService)
  jwtService: JwtService;

  async create(data: CreateUserDto) {
    Logger.log('Create', 'SignupService');
    const { email, name, password, registration_provider } = data;
    let user: IUser;

    user = await this.userService.findOne({
      email: email.toLowerCase(),
    });

    if (user) {
      throw new ConflictException('This user already exists');
    }

    try {
      user = await this.userService.create({
        ...data,
        email: email.toLowerCase(),
        name,
        password,
        registration_provider,
      });

      delete user.password;

      const accessToken = await this.jwtService.signAsync(
        {
          id: user.id,
          email: user.email,
        },
        { expiresIn: '7 days' },
      );
      console.log('🚀 ~~ SignUpService ~~ create ~~ accessToken:', accessToken);

      return {
        ...user,
        accessToken,
      };
    } catch (error) {
      Logger.error(error.message, 'SignupService');

      throw new InternalServerErrorException(error.message);
    }
  }
}

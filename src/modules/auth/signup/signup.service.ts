import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUser } from '../../../database/models/user/user.interface';
import { UserService } from '../../user';
import { CreateUserDto } from '../../user/dto/create-user.dto';

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

      return {
        ...user,
        accessToken: this.jwtService.sign(
          {
            id: user.id,
            uuid: user.uuid,
            email: user.email,
          },
          { expiresIn: '7 days' },
        ),
      };
    } catch (error) {
      Logger.error(error.message, 'SignupService');

      throw new InternalServerErrorException(error.message);
    }
  }
}

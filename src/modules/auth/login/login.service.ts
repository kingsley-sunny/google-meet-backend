import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { IUser } from '../../../database/models/user/user.interface';

@Injectable()
export class LoginService {
  @Inject(JwtService)
  jwtService: JwtService;

  async create(user: IUser) {
    Logger.log('Create', 'LoginService');

    try {
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
      throw new InternalServerErrorException(error.message);
    }
  }
}

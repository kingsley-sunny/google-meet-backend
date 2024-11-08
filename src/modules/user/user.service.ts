import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IUser } from '../../database/models/user/user.interface';
import { UtilsService } from '../../utils/utils.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  @Inject(UserRepository)
  userRepository: UserRepository;

  async create(data: CreateUserDto) {
    Logger.log('create', 'UserService');

    try {
      const { email, password, name, registration_provider, pic_url } = data;
      let hashedPassword;

      if (password) {
        hashedPassword = await UtilsService.hashPassword(password);
      }

      const user = await this.userRepository.create({
        email,
        password: hashedPassword,
        name,
        registration_provider,
        pic_url,
      });

      return user;
    } catch (error) {
      Logger.log(error.message, 'UserService');
      throw new InternalServerErrorException(error.message);
    }
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'UserService');

    try {
      const users = await this.userRepository.find({}, params, 'roles');

      return users;
    } catch (error) {
      Logger.log(error.message, 'UserService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IUser>) {
    Logger.log('findOne', 'UserService');

    const user = await this.userRepository.findOne(params);

    return user;
  }

  async findById(id: string) {
    Logger.log('findById', 'UserService');

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async delete(id: string) {
    Logger.log('delete', 'UserService');

    return await this.userRepository.delete(id);
  }

  async findUserWithEmail(email: string) {
    Logger.log('findUserWithEmail', 'UserService');

    const user = await this.userRepository.findOne({ email });
    console.log('🚀 ~~ UserService ~~ findUserWithEmail ~~ user:', user, email);

    return user;
  }
}

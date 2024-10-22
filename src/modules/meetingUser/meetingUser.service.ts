import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FetchQuery } from '../../database/base/base.interface';
import { IMeetingUser } from '../../database/models/meetingUser/meetingUser.interface';
import { MeetingService } from '../meeting/meeting.service';
import { CreateMeetingUserDto } from './dto/create-meetingUser.dto';
import { UpdateMeetingUserDto } from './dto/update-meetingUser.dto';
import { MeetingUserRepository } from './meetingUser.repository';

@Injectable()
export class MeetingUserService {
  @Inject(MeetingUserRepository)
  meetingUserRepository: MeetingUserRepository;
  @Inject(JwtService)
  meetingService: MeetingService;

  async create(data: CreateMeetingUserDto) {
    Logger.log('create', 'MeetingUserService');

    try {
      const { meeting_id, user_id, name } = data;

      const meetingUser = await this.meetingUserRepository.create({
        meeting_id,
        user_id,
        name,
        status: 'active',
      });

      return { ...meetingUser };
    } catch (error) {
      Logger.log(error.message, 'MeetingUserService');
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateStatus(id: number, userId: number, data: UpdateMeetingUserDto) {
    Logger.log('updateUser', 'MeetingUserService');
    try {
      const { status } = data;
      const meetingUser = await this.meetingUserRepository
        .findOne({ user_id: userId })
        .orWhere({ temporary_user_id: id }); //TODO: work on this fucking code

      if (!meetingUser) {
        throw NotFoundException('Meeting User not found');
      }

      await this.meetingUserRepository.update(id, { status });

      return { ...meetingUser, status };
    } catch (error) {
      Logger.log(error.message, 'updateUser');
      throw new InternalServerErrorException(error.message);
    }
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'MeetingUserService');

    try {
      const meetingUsers = await this.meetingUserRepository.find({}, params);

      return meetingUsers;
    } catch (error) {
      Logger.log(error.message, 'MeetingUserService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: number) {
    Logger.log('findById', 'MeetingUserService');

    const meetingUser = await this.meetingUserRepository.findById(id);
    if (!meetingUser) {
      throw new NotFoundException('MeetingUser not found');
    }

    return meetingUser;
  }

  async findOne(params: Partial<IMeetingUser>) {
    Logger.log('findOne', 'MeetingService');

    const meetingUser = await this.meetingUserRepository.findOne(params);

    return meetingUser;
  }

  async delete(id: number) {
    Logger.log('delete', 'MeetingUserService');

    return await this.meetingUserRepository.delete(id);
  }
}

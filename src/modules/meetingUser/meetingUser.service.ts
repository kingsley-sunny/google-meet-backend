import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IMeeting } from '../../database/models/meeting/meeting.interface';
import { IMeetingUser } from '../../database/models/meetingUser/meetingUser.interface';
import { IUser } from '../../database/models/user/user.interface';
import { MeetingService } from '../meeting/meeting.service';
import { CreateMeetingUserDto } from './dto/create-meetingUser.dto';
import { UpdateMeetingUserDto } from './dto/update-meetingUser.dto';
import { MeetingUserRepository } from './meetingUser.repository';
import { UserService } from '../user/user.service';

@Injectable()
export class MeetingUserService {
  @Inject(MeetingUserRepository)
  meetingUserRepository: MeetingUserRepository;
  @Inject(MeetingService)
  meetingService: MeetingService;

  @Inject(UserService)
  userService: UserService;

  async create(userId: string, data: CreateMeetingUserDto) {
    Logger.log('create', 'MeetingUserService');

    try {
      const { meeting_id, name } = data;
      let user: IUser;
      if (userId) {
        user = await this.userService.findById(userId);
      }

      const meetingUser = await this.meetingUserRepository.create({
        meeting_id,
        id: userId ?? null,
        name,
        status: 'active',
      });

      return { ...meetingUser };
    } catch (error) {
      Logger.log(error.message, 'MeetingUserService');
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateStatus(id: string, data: UpdateMeetingUserDto) {
    Logger.log('updateUser', 'MeetingUserService');
    try {
      const { status } = data;
      const meetingUser = (await this.meetingUserRepository.findById(
        id,
        '[meeting]',
      )) as Required<Partial<IMeetingUser & { meeting: IMeeting }>>;

      if (!meetingUser) {
        throw new NotFoundException('Meeting User not found');
      }

      if (id === meetingUser.meeting?.user_id) {
        await this.meetingUserRepository.update(id, { status });
      }

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

  async findById(id: string) {
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

  async delete(id: string) {
    Logger.log('delete', 'MeetingUserService');

    return await this.meetingUserRepository.delete(id);
  }
}

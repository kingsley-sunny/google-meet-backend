import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IMeeting } from '../../database/models/meeting/meeting.interface';
import { UtilsService } from '../../utils/utils.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingRepository } from './meeting.repository';

@Injectable()
export class MeetingService {
  @Inject(MeetingRepository)
  meetingRepository: MeetingRepository;

  async create(userId: number, data: CreateMeetingDto) {
    Logger.log('create', 'MeetingService');

    let meeting: IMeeting;
    try {
      let { name } = data;
      const link = UtilsService.generateRandomLetters();

      if (!name) {
        name = 'New Meeting - ' + link;
      }

      meeting = await this.meetingRepository.create({
        name,
        link,
        user_id: userId,
      });
    } catch (error) {
      Logger.log(error.message, 'MeetingService');
      throw new InternalServerErrorException(error.message);
    }

    return meeting;
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'MeetingService');

    try {
      const meetings = await this.meetingRepository.find({}, params, 'roles');

      return meetings;
    } catch (error) {
      Logger.log(error.message, 'MeetingService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IMeeting>) {
    Logger.log('findOne', 'MeetingService');

    const meeting = await this.meetingRepository.findOne(params);

    return meeting;
  }

  async findById(id: number) {
    Logger.log('findById', 'MeetingService');

    const meeting = await this.meetingRepository.findById(id);
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    return meeting;
  }

  async JoinMeetingLink(link: string, token: string, userId: number) {
    Logger.log('JoinMeetingLink', 'MeetingService');

    const meeting = await this.meetingRepository.findOne({ link });
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }

    if (meeting.user_id !== userId && !token) {
      throw new UnauthorizedException('You are not allowed in this meeting');
    }

    //Todo: check if the token is in the meeting invites

    return meeting;
  }

  async delete(id: number) {
    Logger.log('delete', 'MeetingService');

    return await this.meetingRepository.delete(id);
  }
}

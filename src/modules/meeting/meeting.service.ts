import {
  forwardRef,
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { FetchQuery } from '../../database/base/base.interface';
import { IMeeting } from '../../database/models/meeting/meeting.interface';
import { UtilsService } from '../../utils/utils.service';
import { MeetingRequestService } from '../meetingRequest/meetingRequest.service';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingRepository } from './meeting.repository';

@Injectable()
export class MeetingService {
  @Inject(MeetingRepository)
  meetingRepository: MeetingRepository;
  @Inject(forwardRef(() => MeetingRequestService))
  meetingRequestService: MeetingRequestService;

  async create(userId: string, data: CreateMeetingDto) {
    Logger.log('create', 'MeetingService');

    let meeting: IMeeting;
    try {
      let { name } = data;

      if (!name) {
        name = 'New Meeting ' + new Date().toDateString();
      }

      meeting = await this.meetingRepository.create({
        name,
        user_id: userId,
        token: UtilsService.generateMeetingToken(userId),
      });
    } catch (error) {
      Logger.log(error.message, 'MeetingService');
      console.log(error);
      throw new InternalServerErrorException(error.message);
    }

    return meeting;
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'MeetingService');

    try {
      const meetings = await this.meetingRepository.find({}, params);

      return meetings;
    } catch (error) {
      Logger.log(error.message, 'MeetingService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findOne(params: Partial<IMeeting>) {
    Logger.log('findOne', 'MeetingService');

    const meeting = await this.meetingRepository.findOne(params);
    if (!meeting) {
      throw new NotFoundException('Meeting not found');
    }
    return meeting;
  }

  async findById(id: string) {
    Logger.log('findById', 'MeetingService');

    try {
      const meeting = await this.meetingRepository.findById(id);
      if (!meeting) {
        throw new NotFoundException('Meeting not found');
      }

      return meeting;
    } catch (error) {
      Logger.log(error.message, 'findById');
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(id: string) {
    Logger.log('delete', 'MeetingService');

    return await this.meetingRepository.delete(id);
  }
}

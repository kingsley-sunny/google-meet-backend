import {
  Inject,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { FetchQuery } from '../../database/base/base.interface';
import { IMeetingInvite } from '../../database/models/meetingInvite/meetingInvite.interface';
import { MeetingService } from '../meeting/meeting.service';
import { CreateMeetingInviteDto } from './dto/create-meetingInvite.dto';
import { UpdateMeetingInviteDto } from './dto/update-meetingInvite.dto';
import { MeetingInviteRepository } from './meetingInvite.repository';

@Injectable()
export class MeetingInviteService {
  @Inject(MeetingInviteRepository)
  meetingInviteRepository: MeetingInviteRepository;
  @Inject(JwtService)
  meetingService: MeetingService;

  async create(data: CreateMeetingInviteDto) {
    Logger.log('create', 'MeetingInviteService');

    try {
      const { name, meeting_id, user_id } = data;

      const meetingInvite = await this.meetingInviteRepository.create({
        meeting_id,
        user_id,
        name,
        status: 'waiting',
      });

      return { ...meetingInvite };
    } catch (error) {
      Logger.log(error.message, 'MeetingInviteService');
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateInvite(id: number, userId: number, data: UpdateMeetingInviteDto) {
    Logger.log('updateInvite', 'MeetingInviteService');
    try {
      const { status } = data;
      const meetingInvite = await this.meetingService.findOne({
        user_id: userId,
        id,
      });

      await this.meetingInviteRepository.update(id, { status });

      return { ...meetingInvite, status };
    } catch (error) {
      Logger.log(error.message, 'updateInvite');
      throw new InternalServerErrorException(error.message);
    }
  }

  async find(params: FetchQuery) {
    Logger.log('find', 'MeetingInviteService');

    try {
      const meetingInvites = await this.meetingInviteRepository.find(
        {},
        params,
      );

      return meetingInvites;
    } catch (error) {
      Logger.log(error.message, 'MeetingInviteService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: number) {
    Logger.log('findById', 'MeetingInviteService');

    const meetingInvite = await this.meetingInviteRepository.findById(id);
    if (!meetingInvite) {
      throw new NotFoundException('MeetingInvite not found');
    }

    return meetingInvite;
  }

  async findOne(params: Partial<IMeetingInvite>) {
    Logger.log('findOne', 'MeetingService');

    const meetingInvite = await this.meetingInviteRepository.findOne(params);

    return meetingInvite;
  }

  async delete(id: number) {
    Logger.log('delete', 'MeetingInviteService');

    return await this.meetingInviteRepository.delete(id);
  }
}

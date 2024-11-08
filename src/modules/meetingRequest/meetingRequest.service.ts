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
import {
  IMeetingRequest,
  RequestStatus,
} from '../../database/models/meetingRequest/meetingRequest.interface';
import { IUser } from '../../database/models/user/user.interface';
import { MeetingRepository } from '../meeting/meeting.repository';
import { MeetingUserService } from '../meetingUser/meetingUser.service';
import { CreateMeetingRequestDto } from './dto/create-meetingRequest.dto';
import { UpdateMeetingRequestDto } from './dto/update-meetingRequest.dto';
import { MeetingRequestRepository } from './meetingRequest.repository';

@Injectable()
export class MeetingRequestService {
  @Inject(MeetingRequestRepository)
  meetingRequestRepository: MeetingRequestRepository;

  @Inject(MeetingRepository)
  meetingRepository: MeetingRepository;

  @Inject(forwardRef(() => MeetingUserService))
  meetingUserService: MeetingUserService;

  async create(userId: string, data: CreateMeetingRequestDto) {
    Logger.log('create', 'MeetingRequestService');

    try {
      const { name, meeting_id } = data;
      console.log('🚀 ~~ MeetingRequestService ~~ create ~~ name:', name);

      const meeting = (await this.meetingRepository.findById(
        meeting_id,
        '[user]',
      )) as Required<Partial<IMeeting & { user: IUser }>>;

      // check if the user is the owner of this meeting (Create a meeting user) proceed
      if (userId === meeting.user_id) {
        await this.meetingUserService.create(userId, {
          meeting_id,
          name: meeting.user.name,
        });
      }

      //todo: if the user has already been accepted before, proceed
      // create the invite for the user
      const meetingRequest = await this.meetingRequestRepository.create({
        meeting_id,
        user_id: userId,
        name: name,
        status: 'waiting',
      });

      //todo: Send a notification for the owner of the meetingc

      return { ...meetingRequest };
    } catch (error) {
      Logger.log(error.message, 'MeetingRequestService');
      throw new InternalServerErrorException(error.message);
    }
  }

  async updateRequest(userId: string, data: UpdateMeetingRequestDto) {
    Logger.log('updateRequest', 'MeetingRequestService');
    try {
      const { status, id, meeting_id } = data;
      let meetingRequest = await this.meetingRequestRepository.findOne({
        user_id: userId,
        id: meeting_id,
      });

      if (!meetingRequest) {
        throw new NotFoundException('Meeting request not found');
      }

      meetingRequest = await this.meetingRequestRepository.model.transaction(
        async (trx) => {
          await this.meetingRequestRepository.update(id, {
            status,
          });

          if (status === 'approved') {
            const meetingUser = await this.meetingUserService.create(userId, {
              meeting_id,
              name: meetingRequest.name,
            });
          }

          return meetingRequest;
        },
      );

      return { ...meetingRequest, status };
    } catch (error) {
      Logger.log(error.message, 'updateRequest');
      throw new InternalServerErrorException(error.message);
    }
  }

  async find(
    userId: string,
    params: FetchQuery & {
      meetingId: string;
      status: keyof typeof RequestStatus;
    },
  ) {
    Logger.log('find', 'MeetingRequestService');

    try {
      const meetingRequests = await this.meetingRequestRepository.find(
        {
          meeting_id: params.meetingId,
          status: params.status,
          user_id: userId,
        },
        params,
      );

      return meetingRequests;
    } catch (error) {
      Logger.log(error.message, 'MeetingRequestService');

      throw new InternalServerErrorException(error.message);
    }
  }

  async findById(id: string) {
    Logger.log('findById', 'MeetingRequestService');

    const meetingRequest = await this.meetingRequestRepository.findById(id);
    if (!meetingRequest) {
      throw new NotFoundException('meetingRequest not found');
    }

    return meetingRequest;
  }

  async findOne(params: Partial<IMeetingRequest>) {
    Logger.log('findOne', 'MeetingService');

    const meetingRequest = await this.meetingRequestRepository.findOne(params);

    return meetingRequest;
  }

  async delete(id: string) {
    Logger.log('delete', 'MeetingRequestService');

    return await this.meetingRequestRepository.delete(id);
  }
}

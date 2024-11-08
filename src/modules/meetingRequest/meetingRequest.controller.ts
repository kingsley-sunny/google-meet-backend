import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from '../../base/base-api-response';
import { FetchQuery } from '../../database/base/base.interface';

import { BaseService } from '../../base/base.service';
import { RequestStatus } from '../../database/models/meetingRequest/meetingRequest.interface';
import { MeetingRequestModel } from '../../database/models/meetingRequest/meetingRequest.model';
import { Public } from '../../decorators/public.decorator';
import { UserId } from '../../decorators/userId.decorator';
import { CreateMeetingRequestDto } from './dto/create-meetingRequest.dto';
import { UpdateMeetingRequestDto } from './dto/update-meetingRequest.dto';
import { MeetingRequestService } from './meetingRequest.service';

@Controller('/meeting-requests')
@ApiTags('meeting-requests')
export class meetingRequestController {
  @Inject(MeetingRequestService)
  private meetingRequestService: MeetingRequestService;

  @Public()
  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: MeetingRequestModel,
      message: 'Successful',
      statusCode: 201,
    }),
  })
  async create(
    @UserId() userId: string,
    @Body() data: CreateMeetingRequestDto,
  ) {
    const meetingRequest = await this.meetingRequestService.create(
      userId,
      data,
    );

    return BaseService.transformResponse(
      meetingRequest,
      'meetingRequest Created Successfully',
    );
  }

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: MeetingRequestModel,
      message: 'Successful',
      statusCode: 201,
    }),
  })
  async updateRequest(
    @UserId() userId: string,
    @Body() data: UpdateMeetingRequestDto,
  ) {
    const meetingRequest = await this.meetingRequestService.updateRequest(
      userId,
      data,
    );

    return BaseService.transformResponse(
      meetingRequest,
      'meetingRequest Created Successfully',
    );
  }

  @Get('meeting')
  async find(
    @UserId() userId: string,
    @Query()
    params: FetchQuery & {
      meetingId: string;
      status: keyof typeof RequestStatus;
    },
  ) {
    const meetingRequests = await this.meetingRequestService.find(
      userId,
      params,
    );

    return BaseService.transformResponse(meetingRequests, 'Successful');
  }
}

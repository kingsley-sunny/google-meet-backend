import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BaseService } from '../../base';
import { BaseApiResponse } from '../../base/base-api-response';
import { FetchQuery } from '../../database/base/base.interface';

import { MeetingInviteModel } from '../../database/models/meetingInvite/meetingInvite.model';
import { UserId } from '../../decorators/userId.decorator';
import { CreateMeetingInviteDto } from './dto/create-meetingInvite.dto';
import { UpdateMeetingInviteDto } from './dto/update-meetingInvite.dto';
import { MeetingInviteService } from './meetingInvite.service';

@Controller('/meetings/invites')
@ApiTags('meetings/invites')
export class MeetingInviteController {
  @Inject(MeetingInviteService)
  private meetingInviteService: MeetingInviteService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: MeetingInviteModel,
      message: 'Successful',
      statusCode: 201,
      isPaginate: true,
    }),
  })
  async create(@Body() data: CreateMeetingInviteDto) {
    const meetingInvite = await this.meetingInviteService.create(data);

    return BaseService.transformResponse(
      meetingInvite,
      'MeetingInvite Created Successfully',
    );
  }

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: MeetingInviteModel,
      message: 'Successful',
      statusCode: 201,
      isPaginate: true,
    }),
  })
  async updateInvite(
    @Param('id') id: number,
    @UserId() userId: number,
    @Body() data: UpdateMeetingInviteDto,
  ) {
    const meetingInvite = await this.meetingInviteService.updateInvite(
      id,
      userId,
      data,
    );

    return BaseService.transformResponse(
      meetingInvite,
      'MeetingInvite Created Successfully',
    );
  }

  @Get()
  async find(@Query() params: FetchQuery) {
    const meetingInvites = await this.meetingInviteService.find(params);

    return BaseService.transformResponse(meetingInvites, 'Successful');
  }
}

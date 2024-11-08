import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BaseApiResponse } from '../../base/base-api-response';
import { FetchQuery } from '../../database/base/base.interface';

import { BaseService } from '../../base/base.service';
import { MeetingUserModel } from '../../database/models/meetingUser/meetingUser.model';
import { UserId } from '../../decorators/userId.decorator';
import { CreateMeetingUserDto } from './dto/create-meetingUser.dto';
import { UpdateMeetingUserDto } from './dto/update-meetingUser.dto';
import { MeetingUserService } from './meetingUser.service';

@Controller('/meetings-users')
@ApiTags('meetings-users')
export class MeetingUserController {
  @Inject(MeetingUserService)
  private meetingUserService: MeetingUserService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: MeetingUserModel,
      message: 'Successful',
      statusCode: 201,
      isPaginate: true,
    }),
  })
  async create(@UserId() userId: string, @Body() data: CreateMeetingUserDto) {
    const meetingUser = await this.meetingUserService.create(userId, data);

    return BaseService.transformResponse(
      meetingUser,
      'MeetingUser Created Successfully',
    );
  }

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: MeetingUserModel,
      message: 'Successful',
      statusCode: 201,
      isPaginate: true,
    }),
  })
  async updateUser(
    @UserId() userId: string,
    @Body() data: UpdateMeetingUserDto,
  ) {
    const meetingUser = await this.meetingUserService.updateStatus(
      userId,
      data,
    );

    return BaseService.transformResponse(
      meetingUser,
      'MeetingUser updated Successfully',
    );
  }

  @Get()
  async find(@Query() params: FetchQuery) {
    const meetingUsers = await this.meetingUserService.find(params);

    return BaseService.transformResponse(meetingUsers, 'Successful');
  }
}

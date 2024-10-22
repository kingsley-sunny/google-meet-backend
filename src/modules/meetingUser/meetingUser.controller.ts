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

import { MeetingUserModel } from '../../database/models/meetingUser/meetingUser.model';
import { UserId } from '../../decorators/userId.decorator';
import { CreateMeetingUserDto } from './dto/create-meetingUser.dto';
import { UpdateMeetingUserDto } from './dto/update-meetingUser.dto';
import { MeetingUserService } from './meetingUser.service';

@Controller('/meetings/users')
@ApiTags('meetings/users')
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
  async create(@Body() data: CreateMeetingUserDto) {
    const meetingUser = await this.meetingUserService.create(data);

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
    @Param('id') id: number,
    @UserId() userId: number,
    @Body() data: UpdateMeetingUserDto,
  ) {
    const meetingUser = await this.meetingUserService.updateStatus(
      id,
      userId,
      data,
    );

    return BaseService.transformResponse(
      meetingUser,
      'MeetingUser Created Successfully',
    );
  }

  @Get()
  async find(@Query() params: FetchQuery) {
    const meetingUsers = await this.meetingUserService.find(params);

    return BaseService.transformResponse(meetingUsers, 'Successful');
  }
}

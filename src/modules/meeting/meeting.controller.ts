import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiAcceptedResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { BaseService } from '../../base';
import { BaseApiResponse } from '../../base/base-api-response';
import { ROLES } from '../../base/base.constant';
import { FetchQuery } from '../../database/base/base.interface';
import { MeetingModel } from '../../database/models/meeting/meeting.model';
import { TemporaryId } from '../../decorators/temporaryId.decorator';
import { Roles } from '../../decorators/roles.decorator';
import { UserId } from '../../decorators/userId.decorator';
import { MeetingGuard } from '../../guards/meeting.guard';
import { CreateMeetingDto } from './dto/create-meeting.dto';
import { MeetingService } from './meeting.service';

@Roles(ROLES.OWNER, ROLES.ADMIN)
@Controller('/meetings')
@ApiTags('meetings')
export class MeetingController {
  @Inject(MeetingService)
  private meetingService: MeetingService;

  @Post()
  @ApiCreatedResponse({
    type: BaseApiResponse({
      data: MeetingModel,
      message: 'nack',
      statusCode: 201,
      isPaginate: true,
    }),
  })
  async create(@UserId() userId: number, @Body() data: CreateMeetingDto) {
    const meeting = await this.meetingService.create(userId, data);

    return BaseService.transformResponse(
      meeting,
      'Meeting Created Successfully',
    );
  }

  @Get()
  async find(@Query() params: FetchQuery) {
    const meetings = await this.meetingService.find(params);

    return BaseService.transformResponse(meetings, 'Successful');
  }

  @ApiAcceptedResponse({
    type: BaseApiResponse({
      data: MeetingModel,
      message: 'Successful',
      statusCode: 200,
    }),
  })
  @UseGuards(MeetingGuard)
  @Get(':link')
  async findByLink(
    @Param('link') link: string,
    @UserId() userId: number,
    @TemporaryId() tempId: string,
  ) {
    const meetings = await this.meetingService.JoinMeetingLink(
      link,
      tempId,
      userId,
    );

    return BaseService.transformResponse(meetings, 'Successful');
  }
}

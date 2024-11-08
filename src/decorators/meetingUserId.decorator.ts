import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const MeetingUserId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    Logger.log('MeetingUserId', 'MeetingUserId.Decorator');

    const request = ctx.switchToHttp().getRequest();
    return request.meetingUserId;
  },
);

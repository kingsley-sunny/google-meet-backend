import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const MeetingToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    Logger.log('MeetingToken', 'MeetingToken.Decorator');

    const request = ctx.switchToHttp().getRequest();
    return request.meetingToken;
  },
);

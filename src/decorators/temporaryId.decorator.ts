import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';

export const TemporaryId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    Logger.log('TemporaryId', 'TemporaryId.Decorator');

    const request = ctx.switchToHttp().getRequest();
    return request.tempId;
  },
);

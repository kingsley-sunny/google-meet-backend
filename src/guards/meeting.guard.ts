import {
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class MeetingGuard extends AuthGuard('jwt') {
  @Inject(JwtService)
  jwtService: JwtService;
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    Logger.log('CancanActivate', 'MeetingGuard');
    const request = this.getRequest(context);
    const { meetingUserId, token } = this.extractTokenFromHeader(request);

    if (!meetingUserId && !token) {
      throw new UnauthorizedException(
        'You are authorized to join this meeting',
      );
    }

    request['meetingUserId'] = meetingUserId;
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const meetingUserId = request.headers.get('temp-id');
    const [type, token] =
      request.headers.get('authorization')?.split(' ') ?? [];

    return { meetingUserId, token };
  }
}

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
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('You are not allowed in this meeting');
    }

    const payload = await this.jwtService.verifyAsync(token);
    request['meetingInvite'] = payload;
    request['meetingToken'] = payload?.meetingToken;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers.get('meetingToken');
    return token;
  }
}

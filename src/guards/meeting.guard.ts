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
    const { tempId, token } = this.extractTokenFromHeader(request);

    if (!tempId && !token) {
      throw new UnauthorizedException(
        'You are authorized to join this meeting',
      );
    }

    request['tempId'] = tempId;
    return true;
  }

  private extractTokenFromHeader(request: Request) {
    const tempId = request.headers.get('temp-id');
    const [type, token] =
      request.headers.get('authorization')?.split(' ') ?? [];

    return { tempId, token };
  }
}

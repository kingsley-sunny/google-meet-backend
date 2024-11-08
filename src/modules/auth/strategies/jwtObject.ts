import { ExtractJwt } from 'passport-jwt';
import { EnvironmentService } from '../../../config/environment/environment.service';

export const JwtObject = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  ignoreExpiration: false,
  secretOrKey: EnvironmentService.getValue('jwtSecretToken'),
};

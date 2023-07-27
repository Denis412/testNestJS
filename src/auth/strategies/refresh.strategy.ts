import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.refreshSecret,
    });
  }

  async validate(payload: any): Promise<any> {
    console.log('valid');

    return { userId: payload.id, email: payload.email };
  }

  //   validate(req: Request, payload: any) {
  //     const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
  //     return { ...payload, refreshToken };
  //   }
}

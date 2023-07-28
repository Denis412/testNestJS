import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from '../constants';
import { Context } from '@nestjs/graphql';

@Injectable()
export class JWTRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    return { userId: payload.id, email: payload.email };
  }

  //   validate(req: Request, payload: any) {
  //     const refreshToken = req.get('Authorization').replace('Bearer', '').trim();
  //     return { ...payload, refreshToken };
  //   }
}

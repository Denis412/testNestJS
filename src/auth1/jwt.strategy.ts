import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { Auth1Service } from './auth1.service';
import { ExtractJwt } from 'passport-jwt';
import { jwtConstants } from './constants';

@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: Auth1Service) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any): Promise<any> {
    return { userId: payload.id, email: payload.email };
  }
}

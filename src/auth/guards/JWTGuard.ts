import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../constants';

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  constructor(private jwtService: JwtService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;
    const token = req.get('Authorization')?.replace('Bearer ', '');

    const jwtData = <jwt.JwtPayload>jwt.verify(token, jwtConstants.secret);

    // console.log('data', jwtData);

    req.userId = jwtData.id;

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

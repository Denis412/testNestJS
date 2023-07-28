import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constants';

@Injectable()
export class JWTGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const token = ctx
      .getContext()
      .req.get('Authorization')
      .replace('Bearer ', '');

    <jwt.JwtPayload>jwt.verify(token, jwtConstants.secret);

    return true;
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}

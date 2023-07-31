import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from '../constants';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const gqlContext = GqlExecutionContext.create(context);
    const jwtToken = gqlContext
      .getContext()
      .req.get('Authorization')
      .replace('Bearer ', '');

    console.log(jwtToken);

    <jwt.JwtPayload>jwt.verify(jwtToken, jwtConstants.secret);

    return true;
  }
}

import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      /(product(s)?|paginateProducts)/.test(req.body.query) ||
      /(category|categories|paginateCategories)/.test(req.body.query)
    ) {
      next();
      return;
    }

    const jwtToken = req.headers.authorization?.replace('Bearer ', '');

    try {
      <jwt.JwtPayload>jwt.verify(jwtToken, jwtConstants.secret);
    } catch (e) {
      throw new UnauthorizedException('Unauthorized');
    }

    next();
  }
}

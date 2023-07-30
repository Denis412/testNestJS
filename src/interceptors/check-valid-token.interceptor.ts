// auth.interceptor.ts

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';

@Injectable()
export class CheckValidTokenInterceptor implements NestInterceptor {
  constructor(
    @InjectRepository(UsedRefresh)
    private readonly repository: Repository<UsedRefresh>,
  ) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const headers = context.getArgs()[2].req.rawHeaders;
    const auth = headers.indexOf('Authorization');
    const auth1 = headers.indexOf('authorization');

    const token = headers[auth !== -1 ? auth + 1 : auth1 + 1].replace(
      'Bearer ',
      '',
    );

    const tokenInformation = <jwt.JwtPayload>(
      jwt.verify(token, jwtConstants.secret)
    );

    if (!tokenInformation) throw new Error('Invalid token');

    const findRefresh = await this.repository.findOneBy({ token });
    if (findRefresh) throw new UnauthorizedException('Token is banned');

    return next.handle().pipe(
      tap(async () => {
        if (tokenInformation.refresh) await this.repository.save({ token });
      }),
    );
  }
}

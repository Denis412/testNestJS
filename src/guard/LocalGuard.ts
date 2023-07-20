import { ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { LocalStrategy } from 'src/auth1/local.strategy';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor(private readonly localStrategy: LocalStrategy) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.getArgs()[1];

    return await this.localStrategy.validate(
      request.input.email,
      request.input.password,
    );
  }
}

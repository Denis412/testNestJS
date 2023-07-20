import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LocalStrategy } from '../strategies/local.strategy';

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

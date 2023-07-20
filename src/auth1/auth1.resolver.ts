import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Auth1Service } from './auth1.service';
import { Auth1 } from './entities/auth1.entity';
import { UseGuards } from '@nestjs/common';
import { SingIn } from './entities/sign-in.entity';
import { SingInInput } from './dto/sign-in.input';
import { LocalGuard } from 'src/guard/LocalGuard';

@Resolver(() => Auth1)
export class Auth1Resolver {
  constructor(private readonly auth1Service: Auth1Service) {}

  @UseGuards(LocalGuard)
  @Mutation(() => SingIn, { name: 'SignIn' })
  SignIn(@Args('input') input: SingInInput): Promise<SingIn> {
    return this.auth1Service.validateUser(input.email, input.password);
  }
}

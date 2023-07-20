import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { UseGuards } from '@nestjs/common';
import { SingIn } from './entities/sign-in.entity';
import { SingUp } from './entities/sign-up.entity';
import { SignInInput } from './dto/sign-in.input';
import { LocalGuard } from './guards/LocalGuard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { SignUpInput } from './dto/sign-up.input';

@Resolver(() => Auth)
export class Auth1Resolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalGuard)
  @Mutation(() => SingIn, { name: 'SignIn' })
  SignIn(@Args('input') input: SignInInput): Promise<SingIn> {
    return this.authService.validateUser(input.email, input.password);
  }

  @Mutation(() => SingUp, { name: 'SignUp' })
  SignUp(@Args('input') input: SignUpInput): Promise<User> {
    return this.userService.create(input);
  }
}

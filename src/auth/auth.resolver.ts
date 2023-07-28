import { Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { SingIn } from './entities/sign-in.entity';
import { SingUp } from './entities/sign-up.entity';
import { SignInInput } from './dto/sign-in.input';
import { LocalGuard } from './guards/LocalGuard';
import { UserService } from 'src/user/user.service';
import { User } from 'src/user/entities/user.entity';
import { SignUpInput } from './dto/sign-up.input';
import { AuthTokens } from './entities/auth-tokens.entity';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(LocalGuard)
  @Mutation(() => SingIn, { name: 'SignIn' })
  SignIn(@Args('input') input: SignInInput): Promise<SingIn> {
    return this.authService.validateUser(input.email, input.password);
  }

  @Mutation(() => AuthTokens)
  async refreshToken(@Args('token') refreshToken: string) {
    const payload = await this.authService.verifyToken(refreshToken);
    if (!payload) throw new UnauthorizedException('Invalid token');

    const user = await this.userService.findOne(payload.id);
    if (!user) throw new UnauthorizedException('User not found');

    const tokens = this.authService.generateTokens(user);
    this.authService.createUsedRefresh({ token: refreshToken });
    return tokens;
  }

  @Mutation(() => SingUp, { name: 'SignUp' })
  SignUp(@Args('input') input: SignUpInput): Promise<User> {
    return this.userService.create(input);
  }
}

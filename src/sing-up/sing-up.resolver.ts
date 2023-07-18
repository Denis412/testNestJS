import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SingUpService } from './sing-up.service';
import { SingUp } from './entities/sing-up.entity';
import { SingUpInput } from './dto/sing-up.input';
import { UserService } from 'src/user/user.service';

@Resolver(() => SingUp)
export class SingUpResolver {
  constructor(
    private readonly singUpService: SingUpService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => SingUp)
  async SignUp(@Args('input') input: SingUpInput) {
    return this.userService.create(input);
  }
}

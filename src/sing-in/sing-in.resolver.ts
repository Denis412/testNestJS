import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { SingInService } from './sing-in.service';
import { SingIn } from './entities/sing-in.entity';
import { SingInInput } from './dto/sing-in.input';

@Resolver(() => SingIn)
export class SingInResolver {
  constructor(private readonly singInService: SingInService) {}

  // @Mutation(() => SingIn, { name: 'SignIn' })
  // createSingIn(@Args('input') input: SingInInput) {
  //   return this.singInService.create(input);
  // }
}

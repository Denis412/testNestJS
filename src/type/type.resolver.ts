import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TypeService } from './type.service';
import { Type } from './entities/type.entity';
import { CreateTypeInput } from './dto/create-type.input';
import { UpdateTypeInput } from './dto/update-type.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';

@UseGuards(JWTGuard)
@UseInterceptors(CheckValidTokenInterceptor)
@Resolver(() => Type)
export class TypeResolver {
  constructor(private readonly typeService: TypeService) {}

  @Mutation(() => Type)
  createType(@Args('input') input: CreateTypeInput, @CurrentUser() userId: string) {
    return this.typeService.create(input, userId);
  }

  @Query(() => [Type], { name: 'types' })
  findAll() {
    return this.typeService.findAll();
  }

  @Query(() => Type, { name: 'type' })
  findOne(@Args('id') id: string) {
    return this.typeService.findOne(id);
  }

  @Mutation(() => Type)
  updateType(@Args('input') input: UpdateTypeInput, @Args('id') id: string) {
    return this.typeService.update(id, input);
  }

  @Mutation(() => Type)
  removeType(@Args('id') id: string) {
    return this.typeService.remove(id);
  }
}

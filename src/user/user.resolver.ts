import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { UpdateUserInput } from './dto/update-user.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { PaginatorUser } from './entities/paginator.entity';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';

@UseGuards(JWTGuard)
@UseInterceptors(CheckValidTokenInterceptor)
@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.userService.findAll(where, orderBy);
  }

  @Query(() => PaginatorUser, { name: 'paginateUsers' })
  getAllWithPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args('perPage', { type: () => Int, nullable: true, defaultValue: 50 })
    perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy: PaginatorOrderBy,
  ) {
    return this.userService.getAllWithPaginate(page, perPage, where, orderBy);
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  updateUser(
    @Args('input', { type: () => UpdateUserInput })
    updateUserInput: UpdateUserInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.userService.update(id, updateUserInput);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { InviteUser } from './entities/invite-user.entity';
import { InviteUserInput } from './dto/invite-user.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { PermissionGuard } from 'src/permission-rule/guards/permission.guard';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';
import { PaginatorGroup } from './entities/paginator.entity';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@UseGuards(JWTGuard, PermissionGuard)
@UseInterceptors(CheckValidTokenInterceptor)
@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => Group, { name: 'create_group' })
  createGroup(@Args('input') input: CreateGroupInput, @CurrentUser() userId: string) {
    return this.groupService.create(input, userId);
  }

  @Query(() => PaginatorGroup, { name: 'paginate_category' })
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
    return this.groupService.getAllWithPaginate(page, perPage, where, orderBy);
  }

  @Query(() => Group, { name: 'get_group' })
  findOne(@Args('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Mutation(() => InviteUser)
  inviteUser(@Args('input') input: InviteUserInput) {
    return '';
  }

  @Mutation(() => Group)
  updateGroup(@Args('input') input: UpdateGroupInput, @Args('id') id: string) {
    return this.groupService.update(id, input);
  }

  @Mutation(() => Group)
  removeGroup(@Args('id') id: string) {
    return this.groupService.remove(id);
  }
}

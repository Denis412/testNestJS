import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Group } from './entities/group.entity';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';
import { PermissionGuard } from 'src/permission-rule/guards/permission.guard';
import { PaginatorGroup } from './entities/paginator.entity';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@UseGuards(JWTGuard, PermissionGuard)
@UseInterceptors(CheckValidTokenInterceptor)
@Resolver(() => Group)
export class GroupResolver {
  constructor(private readonly groupService: GroupService) {}

  @Mutation(() => Group, { name: 'create_group' })
  createGroup(@Args('input') input: CreateGroupInput, @CurrentUser() userId: string) {
    return this.groupService.create(input, userId);
  }

  @Query(() => PaginatorGroup, { name: 'paginate_group' })
  async getAllWithPaginate(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.groupService.getAllWithPagination(page, perPage, where, orderBy);
  }

  @Query(() => Group, { name: 'get_group' })
  findOne(@Args('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Mutation(() => Group, { name: 'update_group' })
  updateGroup(@Args('id') id: string, @Args('input') input: UpdateGroupInput) {
    return this.groupService.update(id, input);
  }

  @Mutation(() => Group, { name: 'delete_group' })
  removeGroup(@Args('id') id: string) {
    return this.groupService.remove(id);
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionRuleService } from './permission-rule.service';
import { PermissionRule } from './entities/permission-rule.entity';
import { CreatePermissionRuleInput } from './dto/create-permission-rule.input';
import { UpdatePermissionRuleInput } from './dto/update-permission-rule.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';
import { PaginatorPermissionRule } from './entities/paginator.entity';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@UseGuards(JWTGuard)
@UseInterceptors(CheckValidTokenInterceptor)
@Resolver(() => PermissionRule)
export class PermissionRuleResolver {
  constructor(private readonly permissionRuleService: PermissionRuleService) {}

  @Mutation(() => PermissionRule, { name: 'create_permissionRule' })
  createPermissionRule(@Args('input') input: CreatePermissionRuleInput, @CurrentUser() userId: string) {
    return this.permissionRuleService.create(input, userId);
  }

  @Query(() => [PermissionRule], { name: 'paginate_permissionRule' })
  @Query(() => PaginatorPermissionRule, { name: 'paginate_property' })
  async getAllWithPaginate(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.permissionRuleService.getAllWithPagination(page, perPage, where, orderBy);
  }
  @Query(() => PermissionRule, { name: 'get_permissionRule' })
  findOne(@Args('id') id: string) {
    return this.permissionRuleService.findOne(id);
  }

  @Mutation(() => PermissionRule, { name: 'update_permissionRule' })
  updatePermissionRule(@Args('input') input: UpdatePermissionRuleInput, @Args('id') id: string) {
    return this.permissionRuleService.update(id, input);
  }

  @Mutation(() => PermissionRule, { name: 'delete_permissionRule' })
  removePermissionRule(@Args('id') id: string) {
    return this.permissionRuleService.remove(id);
  }
}

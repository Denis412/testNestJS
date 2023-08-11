import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PermissionRuleService } from './permission-rule.service';
import { PermissionRule } from './entities/permission-rule.entity';
import { CreatePermissionRuleInput } from './dto/create-permission-rule.input';
import { UpdatePermissionRuleInput } from './dto/update-permission-rule.input';

@Resolver(() => PermissionRule)
export class PermissionRuleResolver {
  constructor(private readonly permissionRuleService: PermissionRuleService) {}

  @Mutation(() => PermissionRule)
  createPermissionRule(@Args('createPermissionRuleInput') createPermissionRuleInput: CreatePermissionRuleInput) {
    return this.permissionRuleService.create(createPermissionRuleInput);
  }

  @Query(() => [PermissionRule], { name: 'permissionRule' })
  findAll() {
    return this.permissionRuleService.findAll();
  }

  @Query(() => PermissionRule, { name: 'permissionRule' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.permissionRuleService.findOne(id);
  }

  @Mutation(() => PermissionRule)
  updatePermissionRule(@Args('updatePermissionRuleInput') updatePermissionRuleInput: UpdatePermissionRuleInput) {
    return this.permissionRuleService.update(updatePermissionRuleInput.id, updatePermissionRuleInput);
  }

  @Mutation(() => PermissionRule)
  removePermissionRule(@Args('id', { type: () => Int }) id: number) {
    return this.permissionRuleService.remove(id);
  }
}

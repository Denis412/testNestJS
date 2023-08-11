import { Injectable } from '@nestjs/common';
import { CreatePermissionRuleInput } from './dto/create-permission-rule.input';
import { UpdatePermissionRuleInput } from './dto/update-permission-rule.input';

@Injectable()
export class PermissionRuleService {
  create(createPermissionRuleInput: CreatePermissionRuleInput) {
    return 'This action adds a new permissionRule';
  }

  findAll() {
    return `This action returns all permissionRule`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permissionRule`;
  }

  update(id: number, updatePermissionRuleInput: UpdatePermissionRuleInput) {
    return `This action updates a #${id} permissionRule`;
  }

  remove(id: number) {
    return `This action removes a #${id} permissionRule`;
  }
}

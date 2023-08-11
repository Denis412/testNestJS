import { Module } from '@nestjs/common';
import { PermissionRuleService } from './permission-rule.service';
import { PermissionRuleResolver } from './permission-rule.resolver';

@Module({
  providers: [PermissionRuleResolver, PermissionRuleService]
})
export class PermissionRuleModule {}

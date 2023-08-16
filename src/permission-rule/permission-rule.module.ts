import { Module } from '@nestjs/common';
import { PermissionRuleService } from './permission-rule.service';
import { PermissionRuleResolver } from './permission-rule.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionRule } from './entities/permission-rule.entity';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionRule, UsedRefresh])],
  providers: [PermissionRuleResolver, PermissionRuleService],
  exports: [PermissionRuleService],
})
export class PermissionRuleModule {}

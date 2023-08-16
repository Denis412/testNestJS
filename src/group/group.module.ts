import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupResolver } from './group.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';
import { PermissionRuleModule } from 'src/permission-rule/permission-rule.module';
import { Group } from './entities/group.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, UsedRefresh]), PermissionRuleModule],
  providers: [GroupResolver, GroupService],
})
export class GroupModule {}

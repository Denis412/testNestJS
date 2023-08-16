import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { AuthModule } from 'src/auth/auth.module';
import { GqlArgumentsHost } from '@nestjs/graphql';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';
import { PermissionRuleModule } from 'src/permission-rule/permission-rule.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, UsedRefresh]), PermissionRuleModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}

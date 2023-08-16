import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { PermissionRule } from './permission-rule.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatorPermissionRule {
  @Field(() => [PermissionRule])
  data: [PermissionRule];

  @Field()
  paginatorInfo: PaginationInfo;
}

import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Group } from './group.entity';

@ObjectType()
export class PaginatorGroup {
  @Field(() => [Group])
  data: [Group];

  @Field()
  paginatorInfo: PaginationInfo;
}

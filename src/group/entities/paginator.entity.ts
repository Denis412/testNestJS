import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Group } from './group.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatorGroup {
  @Field(() => [Group])
  data: [Group];

  @Field()
  paginatorInfo: PaginationInfo;
}

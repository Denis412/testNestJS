import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Type } from './type.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatorType {
  @Field(() => [Type])
  data: [Type];

  @Field()
  paginatorInfo: PaginationInfo;
}

import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Product } from './product.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatorProduct {
  @Field(() => [Product])
  data: [Product];

  @Field()
  paginatorInfo: PaginationInfo;
}

import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Cart } from './cart.entity';

@ObjectType()
export class PaginatorCart {
  @Field(() => [Cart])
  data: [Cart];

  @Field()
  paginatorInfo: PaginationInfo;
}

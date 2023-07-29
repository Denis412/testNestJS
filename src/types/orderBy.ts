import { Field, InputType } from '@nestjs/graphql';
import { PaginatorSortOrder } from './paginator-sort-order';

@InputType()
export default class PaginatorOrderBy {
  @Field()
  column: string;

  @Field(() => PaginatorSortOrder)
  order: PaginatorSortOrder;
}

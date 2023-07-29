import { Field, InputType } from '@nestjs/graphql';
import { PaginatorWhereOperator } from './paginator-where-operator';

@InputType()
export default class PaginatorWhere {
  @Field()
  column: string;

  @Field(() => PaginatorWhereOperator)
  operator: PaginatorWhereOperator;

  @Field()
  value: string;
}

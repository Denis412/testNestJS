import { Field, InputType } from '@nestjs/graphql';
import { PaginatorWhereOperator } from './paginator-where-operator';

@InputType()
export default class PaginatorWhere {
  @Field({ nullable: true })
  column: string;

  @Field(() => PaginatorWhereOperator, { nullable: true })
  operator: PaginatorWhereOperator;

  @Field({ nullable: true })
  value: string;

  @Field(() => [PaginatorWhere], { nullable: true })
  or?: PaginatorWhere[];

  @Field(() => [PaginatorWhere], { nullable: true })
  and?: PaginatorWhere[];
}

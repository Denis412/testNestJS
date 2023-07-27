import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class PaginatorWhere {
  @Field()
  column: string;

  @Field()
  operator: string;

  @Field()
  value: string;
}

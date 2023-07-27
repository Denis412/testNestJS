import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class PaginatorOrderBy {
  @Field()
  column: string;
  @Field()
  order: string;
}

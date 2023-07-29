import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class PaginationInfo {
  @Field()
  page: number;

  @Field()
  perPage: number;

  @Field()
  count: number;

  @Field()
  totalPages: number;

  @Field()
  hasMorePages: boolean;
}

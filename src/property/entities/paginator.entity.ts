import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Property } from './property.entity';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatorProperty {
  @Field(() => [Property])
  data: [Property];

  @Field()
  paginatorInfo: PaginationInfo;
}

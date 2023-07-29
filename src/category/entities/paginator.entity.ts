import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Category } from './category.entity';

@ObjectType()
export class PaginatorCategory {
  @Field(() => [Category])
  data: [Category];

  @Field()
  paginatorInfo: PaginationInfo;
}

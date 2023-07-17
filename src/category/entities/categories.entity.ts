import { Field } from '@nestjs/graphql';
import { Category } from './category.entity';

export class Categories {
  @Field((type) => Array)
  data: Category[];

  @Field((type) => Object)
  paginatorInfo: Object;
}

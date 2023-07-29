import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Favorite } from './favorite.entity';

@ObjectType()
export class PaginatorFavorite {
  @Field(() => [Favorite])
  data: [Favorite];

  @Field()
  paginatorInfo: PaginationInfo;
}

import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { User } from './user.entity';

@ObjectType()
export class PaginatorUser {
  @Field(() => [User])
  data: [User];

  @Field(() => PaginationInfo)
  paginatorInfo: PaginationInfo;
}

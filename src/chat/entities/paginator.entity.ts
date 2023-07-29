import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from './chat.entity';

@ObjectType()
export class PaginatorChat {
  @Field(() => [Chat])
  data: [Chat];

  @Field()
  paginatorInfo: PaginationInfo;
}

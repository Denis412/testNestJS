import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import { Field, ObjectType } from '@nestjs/graphql';
import { Message } from './message.entity';

@ObjectType()
export class PaginatorMessage {
  @Field(() => [Message])
  data: [Message];

  @Field()
  paginatorInfo: PaginationInfo;
}

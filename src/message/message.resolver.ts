import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';

@UseGuards(JWTGuard)
@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message)
  createMessage(@Args('input') createMessageInput: CreateMessageInput) {
    return this.messageService.create(createMessageInput);
  }

  @Query(() => [Message], { name: 'messages' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage?: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.messageService.findAll(page, perPage, where, orderBy);
  }

  @Query(() => Message, { name: 'message' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message)
  updateMessage(
    @Args('input') updateMessageInput: UpdateMessageInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.messageService.update(id, updateMessageInput);
  }

  @Mutation(() => Message)
  async deleteMessage(@Args('id', { type: () => Int }) id: number) {
    await this.messageService.remove(id);
    return {
      id,
    };
  }
}

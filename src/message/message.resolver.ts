import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { MessageService } from './message.service';
import { Message } from './entities/message.entity';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { PaginatorMessage } from './entities/paginator.entity';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@UseGuards(JWTGuard)
@UseInterceptors(CheckValidTokenInterceptor)
@Resolver(() => Message)
export class MessageResolver {
  constructor(private readonly messageService: MessageService) {}

  @Mutation(() => Message, { name: 'create_message' })
  createMessage(@Args('input') createMessageInput: CreateMessageInput, @CurrentUser() userId: string) {
    return this.messageService.create(createMessageInput, userId);
  }

  @Query(() => PaginatorMessage, { name: 'paginate_message' })
  async getAllWithPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args('perPage', { type: () => Int, nullable: true, defaultValue: 50 })
    perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy: PaginatorOrderBy,
  ) {
    return await this.messageService.getAllWithPaginate(page, perPage, where, orderBy);
  }

  @Query(() => Message, { name: 'get_message' })
  findOne(@Args('id') id: string) {
    return this.messageService.findOne(id);
  }

  @Mutation(() => Message, { name: 'update_message' })
  updateMessage(@Args('input') updateMessageInput: UpdateMessageInput, @Args('id') id: string) {
    return this.messageService.update(id, updateMessageInput);
  }

  @Mutation(() => Message, { name: 'delete_message' })
  async deleteMessage(@Args('id') id: string) {
    await this.messageService.remove(id);
    return {
      id,
    };
  }
}

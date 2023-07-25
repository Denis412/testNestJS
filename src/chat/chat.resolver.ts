import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { ChatService } from './chat.service';
import { Chat } from './entities/chat.entity';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { UserService } from 'src/user/user.service';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Resolver(() => Chat)
export class ChatResolver {
  constructor(
    private readonly chatService: ChatService,
    private readonly userService: UserService,
  ) {}

  @Mutation(() => Chat)
  createChat(@Args('input') createChatInput: CreateChatInput) {
    return this.chatService.create(createChatInput);
  }

  @Query(() => [Chat], { name: 'chats' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage?: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.chatService.findAll(page, perPage, where, orderBy);
  }

  @Query(() => Chat, { name: 'chat' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.chatService.findOne(id);
  }

  @Mutation(() => Chat)
  updateChat(
    @Args('input') updateChatInput: UpdateChatInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.chatService.update(id, updateChatInput);
  }

  @Mutation(() => Chat)
  deleteChat(@Args('id', { type: () => Int }) id: number) {
    return this.chatService.remove(id);
  }

  // @ResolveField('saller')
  // async saller(@Parent() chat: Chat) {
  //   const saller = chat.saller;
  //   delete saller.password;
  //   return saller;
  // }
}

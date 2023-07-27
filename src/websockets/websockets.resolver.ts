import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WebsocketsService } from './websockets.service';
import { Websocket } from './entities/websocket.entity';
import { CreateWebsocketInput } from './dto/create-websocket.input';
import { UpdateWebsocketInput } from './dto/update-websocket.input';

@Resolver(() => Websocket)
export class WebsocketsResolver {
  constructor(private readonly websocketsService: WebsocketsService) {}

  @Mutation(() => Websocket)
  createWebsocket(@Args('createWebsocketInput') createWebsocketInput: CreateWebsocketInput) {
    return this.websocketsService.create(createWebsocketInput);
  }

  @Query(() => [Websocket], { name: 'websockets' })
  findAll() {
    return this.websocketsService.findAll();
  }

  @Query(() => Websocket, { name: 'websocket' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.websocketsService.findOne(id);
  }

  @Mutation(() => Websocket)
  updateWebsocket(@Args('updateWebsocketInput') updateWebsocketInput: UpdateWebsocketInput) {
    return this.websocketsService.update(updateWebsocketInput.id, updateWebsocketInput);
  }

  @Mutation(() => Websocket)
  removeWebsocket(@Args('id', { type: () => Int }) id: number) {
    return this.websocketsService.remove(id);
  }
}

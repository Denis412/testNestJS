import { CreateWebsocketInput } from './create-websocket.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateWebsocketInput extends PartialType(CreateWebsocketInput) {
  @Field(() => Int)
  id: number;
}

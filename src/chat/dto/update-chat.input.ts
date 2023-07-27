import { CreateChatInput } from './create-chat.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateChatInput {
  @Field({ nullable: true })
  name: string;
}

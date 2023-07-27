import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateWebsocketInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

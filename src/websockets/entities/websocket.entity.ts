import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Websocket {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

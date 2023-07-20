import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Auth1 {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

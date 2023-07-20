import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateAuth1Input {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

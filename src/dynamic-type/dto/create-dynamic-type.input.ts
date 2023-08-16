import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDynamicTypeInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

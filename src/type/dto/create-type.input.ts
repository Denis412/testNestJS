import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateTypeInput {
  @Field()
  name: string;
}

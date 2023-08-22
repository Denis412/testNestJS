import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  description: string;
}

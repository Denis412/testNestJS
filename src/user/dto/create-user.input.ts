import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ nullable: false })
  first_name: string;

  @Field({ nullable: false })
  last_name: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

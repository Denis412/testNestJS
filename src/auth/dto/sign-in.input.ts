import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SignInInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

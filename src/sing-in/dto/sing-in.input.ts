import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class SingInInput {
  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class InviteUserInput {
  @Field({ nullable: false })
  group_id: string;

  @Field({ nullable: false })
  user_id: string;
}

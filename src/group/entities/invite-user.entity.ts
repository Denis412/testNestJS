import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class InviteUser {
  @Field({ nullable: false })
  group_id: string;

  @Field({ nullable: false })
  user_id: string;
}

import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class SingIn {
  @Field(() => Int, { nullable: true })
  user_id: number;
}

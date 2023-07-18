import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserRelation {
  @Field(() => Int)
  id: number;
}

import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UsedRefreshCreateInput {
  @Field({ nullable: false })
  token: string;
}

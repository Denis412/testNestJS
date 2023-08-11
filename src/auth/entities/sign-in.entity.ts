import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class SingIn {
  @Field()
  user_id: string;

  @Field({ nullable: false })
  token_type: string;

  @Field({ nullable: false })
  access_token: string;

  @Field()
  expires_in: number;

  @Field({ nullable: false })
  refresh_token: string;
}

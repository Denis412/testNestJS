import { ObjectType, Field, Int } from '@nestjs/graphql';
import { AccessToken } from './access-token.entity';

@ObjectType()
export class SingIn {
  @Field(() => Int, { nullable: true })
  user_id: number;

  @Field({ nullable: false })
  token_type: string;

  @Field({ nullable: false })
  access_token: string;

  @Field()
  expires_in: number;

  @Field({ nullable: false })
  refresh_token: string;
}

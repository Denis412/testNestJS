import { ObjectType, Field } from '@nestjs/graphql';
import { AccessToken } from './access-token.entity';

@ObjectType()
export class AuthTokens {
  @Field()
  token_type: string;

  @Field()
  access_token: string;

  @Field()
  expires_in: number;

  @Field()
  refresh_token: string;
}

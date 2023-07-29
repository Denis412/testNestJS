import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field({ nullable: false })
  access_token: string;

  @Field({ nullable: false })
  expires_in: number;
}

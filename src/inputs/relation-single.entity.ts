import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class RelationSingleInput {
  @Field({ nullable: false })
  id: number;
}

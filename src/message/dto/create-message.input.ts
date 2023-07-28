import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { RelationSingleInput } from 'src/inputs/relation-single.entity';

@ObjectType()
@InputType()
export class CreateMessageInput {
  @Field({ nullable: false })
  text: string;

  @Field(() => RelationSingleInput)
  sender: RelationSingleInput;

  @Field({ nullable: false })
  recipient: RelationSingleInput;

  @Field({ nullable: false })
  chat: RelationSingleInput;
}

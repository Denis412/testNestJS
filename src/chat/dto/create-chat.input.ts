import { InputType, Field, ObjectType } from '@nestjs/graphql';
import { RelationSingleInput } from 'src/inputs/relation-single.entity';

@ObjectType()
@InputType()
export class CreateChatInput {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  buyer: RelationSingleInput;

  @Field({ nullable: false })
  saller: RelationSingleInput;
}

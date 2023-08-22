import { CreateGroupInput } from './create-group.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateGroupInput {
  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;
}

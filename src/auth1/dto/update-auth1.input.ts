import { CreateAuth1Input } from './create-auth1.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateAuth1Input extends PartialType(CreateAuth1Input) {
  @Field(() => Int)
  id: number;
}

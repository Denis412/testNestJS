import { CreateDynamicTypeInput } from './create-dynamic-type.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateDynamicTypeInput extends PartialType(CreateDynamicTypeInput) {
  @Field(() => Int)
  id: number;
}

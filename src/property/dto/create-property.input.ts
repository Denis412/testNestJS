import { InputType, Int, Field } from '@nestjs/graphql';
import { RelationSingleInput } from 'src/inputs/relation-single.entity';

@InputType()
export class CreatePropertyInput {
  @Field()
  name: string;

  @Field()
  label: string;

  @Field()
  data_type: string;

  @Field(() => Int)
  order: number;

  // @Field()
  // type_id: string;

  @Field()
  type: RelationSingleInput;
}

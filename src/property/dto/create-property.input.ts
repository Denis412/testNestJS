import { InputType, Int, Field } from '@nestjs/graphql';
import { RelationSingleInput } from 'src/inputs/relation-single.entity';
import MetaScalar from 'src/types/meta/meta.type';

@InputType()
export class CreatePropertyInput {
  @Field()
  name: string;

  @Field()
  label: string;

  @Field()
  data_type: string;

  @Field({ nullable: true })
  unique: boolean;

  @Field({ nullable: true })
  required: boolean;

  @Field(() => Int)
  order: number;

  @Field(() => MetaScalar, { nullable: true })
  meta: MetaScalar;

  @Field()
  type: RelationSingleInput;
}

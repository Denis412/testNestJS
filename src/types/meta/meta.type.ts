import { Field, InputType, Int } from '@nestjs/graphql';
import RelatedType from '../related-type.type';

@InputType()
export default class MetaScalar {
  @Field(() => Int, { nullable: true })
  min: number | null;

  @Field(() => Int, { nullable: true })
  max: number | null;

  @Field({ nullable: true })
  multiline: boolean;

  @Field({ nullable: true })
  mask: string | null;

  @Field({ nullable: true })
  placeholder: string | null;

  @Field(() => RelatedType, { nullable: true })
  related_types: RelatedType[] | null;
}

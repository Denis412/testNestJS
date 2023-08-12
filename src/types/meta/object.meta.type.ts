import { Field, InputType } from '@nestjs/graphql';
import RelatedType from '../related-type.type';

@InputType()
export default class ObjectMeta {
  @Field(() => RelatedType)
  related_types: RelatedType[];
}

import { Field, InputType } from '@nestjs/graphql';

@InputType()
export default class RelatedType {
  @Field()
  type_id: string;

  @Field()
  inverse_relation: boolean;

  @Field()
  inverse_relation_label: string;

  @Field()
  inverse_relation_name: string;
}

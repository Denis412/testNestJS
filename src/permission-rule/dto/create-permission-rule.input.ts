import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class CreatePermissionRuleInput {
  @Field()
  model_type: 'type' | 'object';

  @Field({ nullable: true })
  type_name: string;

  @Field()
  model_id: string;

  @Field()
  owner_id: string;

  @Field(() => Int)
  level: number;
}

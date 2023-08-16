import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionRuleInput {
  @Field()
  level: number;
}

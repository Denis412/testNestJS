import { CreatePermissionRuleInput } from './create-permission-rule.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdatePermissionRuleInput extends PartialType(CreatePermissionRuleInput) {
  @Field(() => Int)
  id: number;
}

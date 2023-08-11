import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreatePermissionRuleInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

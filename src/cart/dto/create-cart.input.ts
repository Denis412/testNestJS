import { InputType, Field } from '@nestjs/graphql';
import { RelationSingleInput } from 'src/inputs/relation-single.entity';

@InputType()
export class CreateCartInput {
  @Field({ nullable: false })
  user: RelationSingleInput;

  @Field({ nullable: false })
  product: RelationSingleInput;
}

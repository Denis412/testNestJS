import { InputType, Int, Field } from '@nestjs/graphql';
import { type } from 'os';
import { RelationSingleInput } from 'src/inputs/relation-single.entity';

@InputType()
export class CreateFavoriteInput {
  @Field({ nullable: false })
  product: RelationSingleInput;

  @Field({ nullable: false })
  user: RelationSingleInput;
}

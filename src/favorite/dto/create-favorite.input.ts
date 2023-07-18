import { InputType, Int, Field } from '@nestjs/graphql';
import { type } from 'os';

@InputType()
export class CreateFavoriteInput {
  @Field((type) => Int)
  id: number;
}

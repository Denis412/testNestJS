import { CreateFavoriteInput } from './create-favorite.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateFavoriteInput extends PartialType(CreateFavoriteInput) {
  @Field()
  id: string;
}

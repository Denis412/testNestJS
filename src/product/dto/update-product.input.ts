import { CreateProductInput } from './create-product.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  price: number;

  @Field({ nullable: true })
  old_price: number;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: true })
  quantity: number;
}

import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateProductInput {
  // @Field(() => Int)
  // id: number;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  price: number;

  @Field({ nullable: false })
  quantity: number;
}

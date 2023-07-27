import { InputType, Int, Field } from '@nestjs/graphql';
import { RelationSingleInput } from 'src/inputs/relation-single.entity';

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

  @Field({ nullable: true })
  old_price: number;

  @Field({ nullable: true })
  image: string;

  @Field({ nullable: false })
  user: RelationSingleInput;

  @Field({ nullable: false })
  category: RelationSingleInput;

  @Field({ nullable: false })
  quantity: number;
}

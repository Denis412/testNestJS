import { InputType, Int, Field } from '@nestjs/graphql';
import { Column } from 'typeorm';

@InputType()
export class CreateCategoryInput {
  @Column()
  @Field({ nullable: false })
  name: string;
}
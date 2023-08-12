import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export default class TextMeta {
  @Field(() => Int, { nullable: true })
  min: number | null;

  @Field(() => Int, { nullable: true })
  max: number | null;

  @Field({ nullable: true })
  mask: string | null;

  @Field({ nullable: true })
  placeholder: string | null;

  @Field({ nullable: true })
  multiline: boolean;
}

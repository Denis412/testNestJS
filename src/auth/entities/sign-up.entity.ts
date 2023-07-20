import { ObjectType, Field } from '@nestjs/graphql';
import { CreateUserInput } from 'src/user/dto/create-user.input';

@ObjectType()
export class SingUp extends CreateUserInput {
  @Field({ nullable: false })
  first_name: string;

  @Field({ nullable: false })
  last_name: string;

  @Field({ nullable: false })
  email: string;

  @Field({ nullable: false })
  password: string;
}

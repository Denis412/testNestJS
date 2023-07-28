import { InputType, Int, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';

@InputType()
export class CreateUserInput {
  @ApiProperty()
  @Field({ nullable: false, description: 'Имя' })
  first_name: string;

  @ApiProperty()
  @Field({ nullable: false, description: 'Фамилия' })
  last_name: string;

  @ApiProperty()
  @Field({ nullable: false, description: 'Почта' })
  email: string;

  @ApiProperty()
  @Field({ nullable: false, description: 'Пароль' })
  password: string;
}

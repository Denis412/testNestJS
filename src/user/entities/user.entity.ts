import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Идентификатор пользователя' })
  id: number;

  @Column({ nullable: false })
  @Field({ nullable: false, description: 'Имя пользователя' })
  first_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true, description: 'Отчество пользователя' })
  middle_name: string;

  @Column({ nullable: false })
  @Field({ nullable: false, description: 'Фамилия пользователя ' })
  last_name: string;

  @Column({ unique: true, nullable: false })
  @Field({ nullable: false, description: 'Адрес электронной почты' })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Field({ description: 'Дата создания' })
  @CreateDateColumn()
  created_at: Date;

  @Field({ description: 'Дата обновления' })
  @UpdateDateColumn()
  updated_at: Date;
}

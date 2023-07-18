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
  @Field(() => Int)
  id: number;

  @Column({ nullable: false })
  @Field({ nullable: false })
  first_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  middle_name: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  last_name: string;

  @Column({ unique: true, nullable: false })
  @Field({ nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

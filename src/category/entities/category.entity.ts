import { ObjectType, Field, Int } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @CreateDateColumn()
  @Field({ nullable: false })
  created_at: Date;

  @UpdateDateColumn()
  @Field({ nullable: false })
  updated_at: Date;
}

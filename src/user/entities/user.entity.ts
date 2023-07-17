import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Chat } from 'src/chat/entities/chat.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  first_name: string;

  @Column()
  @Field({ nullable: false })
  middle_name: string;

  @Column()
  @Field({ nullable: false })
  last_name: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  email: string;

  @Column()
  @Field({ nullable: false })
  password: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

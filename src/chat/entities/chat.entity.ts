import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Chat {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'byuer_id' })
  buyer: User;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'saller_id' })
  saller: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

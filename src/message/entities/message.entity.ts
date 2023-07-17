import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Chat } from 'src/chat/entities/chat.entity';
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

@Entity()
@ObjectType()
export class Message {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column({ type: 'varchar', length: 500 })
  @Field({ nullable: false })
  text: string;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'recipient_id' })
  recipient: User;

  @Field({ nullable: false })
  @ManyToOne(() => Chat, (chat) => chat.id)
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

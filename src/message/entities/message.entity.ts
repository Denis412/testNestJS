import { ObjectType, Field } from '@nestjs/graphql';
import { Chat } from 'src/chat/entities/chat.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Message {
  @Field()
  @PrimaryColumn()
  id: string;

  @Column({ type: 'varchar', length: 500 })
  @Field({ nullable: false })
  text: string;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'sender_id' })
  sender: User;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'recipient_id' })
  recipient: User;

  @Field({ nullable: false })
  @ManyToOne(() => Chat, (chat) => chat.id, { eager: true })
  @JoinColumn({ name: 'chat_id' })
  chat: Chat;

  @Field()
  @Column()
  author_id: string;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

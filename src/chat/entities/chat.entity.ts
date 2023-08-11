import { ObjectType, Field } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Chat {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column()
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'buyer_id' })
  buyer: User;

  @Column({ default: false, nullable: false })
  hided: boolean;

  @Field({ nullable: true })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'saller_id' })
  saller: User;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

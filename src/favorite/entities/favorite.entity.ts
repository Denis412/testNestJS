import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/product/entities/product.entity';
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
export class Favorite {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Field({ nullable: false })
  @ManyToOne(() => Product, (product) => product.id, { eager: true })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Field()
  @CreateDateColumn()
  created_at: Date;

  @Field()
  @UpdateDateColumn()
  updated_at: Date;
}

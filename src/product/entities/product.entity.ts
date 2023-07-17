import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
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
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Field({ nullable: false })
  title: string;

  @Column()
  @Field({ nullable: false })
  description: string;

  @Column({ type: 'float', nullable: false })
  @Field({ nullable: false })
  price: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  prev_price: number;

  @Column({ type: 'int', nullable: false })
  @Field({ nullable: false })
  quantity: number;

  @Field({ nullable: false })
  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Field({ nullable: false })
  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  @Field({ nullable: false })
  image_url: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

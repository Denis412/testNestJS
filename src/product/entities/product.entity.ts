import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/category/entities/category.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @Field()
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false })
  title: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  description: string;

  @Column({ type: 'float', nullable: false })
  @Field({ nullable: false })
  price: number;

  @Column({ type: 'float', nullable: true })
  @Field({ nullable: true })
  old_price: number;

  @Column({ type: 'int', nullable: false, default: 1 })
  @Field({ nullable: false, defaultValue: 1 })
  quantity: number;

  @Field({ nullable: true })
  @ManyToOne(() => Category, (category) => category.id, { eager: true })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Field({ nullable: true })
  @ManyToOne(() => User, (user) => user.id, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ nullable: true })
  @Field({ nullable: true, defaultValue: null })
  image: string;

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

import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Category {
  @PrimaryColumn()
  @Field()
  id: string;

  @Column({ unique: true })
  @Field({ nullable: false })
  name: string;

  @Field()
  @Column()
  author_id: string;

  @CreateDateColumn()
  @Field({ nullable: false })
  created_at: Date;

  @UpdateDateColumn()
  @Field({ nullable: false })
  updated_at: Date;
}

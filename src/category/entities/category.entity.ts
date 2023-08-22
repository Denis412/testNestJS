import { ObjectType, Field } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, Index, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
@Index('idx_fulltext_name', ['name'], { fulltext: true })
export class Category {
  @PrimaryColumn()
  @Field()
  id: string;

  @Field({ nullable: false })
  @Column({ unique: true })
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

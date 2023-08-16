import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity()
@ObjectType()
export class PermissionRule {
  @PrimaryColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  model_type: 'type' | 'object';

  @Field({ nullable: true })
  @Column({ nullable: true })
  type_name: string;

  @Field()
  @Column()
  model_id: string;

  @Field()
  @Column()
  owner_id: string;

  @Field(() => Int)
  @Column({ type: 'int' })
  level: number;

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

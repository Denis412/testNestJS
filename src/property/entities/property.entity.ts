import { ObjectType, Field, Int } from '@nestjs/graphql';
import { RelationSingleInput } from 'src/inputs/relation-single.entity';
import { Type } from 'src/type/entities/type.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Property {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field({ description: 'Идентификатор типа' })
  @Column({ nullable: true })
  type_id: string;

  @Field({ description: 'Метка свойства' })
  @Column({ nullable: true })
  label: string;

  @Field({ description: 'Тип свойства' })
  @Column()
  data_type: string;

  @Field({ defaultValue: false })
  @Column({ default: false })
  required: boolean;

  @Field({ defaultValue: false })
  @Column({ default: false })
  unique: boolean;

  @Field(() => Int)
  @Column({ type: 'int' })
  order: number;

  @Field(() => Type)
  @ManyToOne(() => Type, (type) => type.properties)
  type: Type;

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

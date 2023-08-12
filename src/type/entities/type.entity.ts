import { ObjectType, Field } from '@nestjs/graphql';
import { Property } from 'src/property/entities/property.entity';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Type {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field({ description: 'Название типа' })
  @Column({ unique: true })
  name: string;

  @Field()
  @Column({ nullable: true })
  description: string;

  @Field({ description: 'Метка типа' })
  @Column({ nullable: true })
  label: string;

  @Field(() => [Property])
  @OneToMany(() => Property, (property) => property.type, { eager: true })
  properties: Property[];

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

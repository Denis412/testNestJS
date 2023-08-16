import { ObjectType, Field } from '@nestjs/graphql';
import { Group } from 'src/group/entities/group.entity';
import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @Field()
  @PrimaryColumn()
  id: string;

  @Column({ nullable: false })
  @Field({ nullable: false, description: 'Имя пользователя' })
  first_name: string;

  @Column({ nullable: true })
  @Field({ nullable: true, description: 'Отчество пользователя' })
  middle_name: string;

  @Column({ nullable: false })
  @Field({ nullable: false, description: 'Фамилия пользователя ' })
  last_name: string;

  @Column({ unique: true, nullable: false })
  @Field({ nullable: false, description: 'Адрес электронной почты' })
  email: string;

  @Field(() => [Group])
  @ManyToMany(() => Group, (group) => group.subjects, { eager: true })
  groups: Group[];

  @Column({ nullable: false })
  password: string;

  @Field({ description: 'Дата создания' })
  @CreateDateColumn()
  created_at: Date;

  @Field({ description: 'Дата обновления' })
  @UpdateDateColumn()
  updated_at: Date;
}

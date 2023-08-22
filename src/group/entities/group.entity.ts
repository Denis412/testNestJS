import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Group {
  @Field()
  @PrimaryColumn()
  id: string;

  @Field({ nullable: false })
  @Column({ nullable: false })
  name: string;

  @Field()
  @Column()
  description: string;

  @Field(() => [User])
  @ManyToMany(() => User, (user) => user.groups)
  @JoinTable({
    name: 'group_user',
    joinColumn: {
      name: 'group_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  subjects: User;

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

import { ObjectType, Field } from '@nestjs/graphql';
import { AccessToken } from './access-token.entity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class UsedRefresh {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: false })
  token: string;
}

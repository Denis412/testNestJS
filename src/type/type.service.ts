import { Inject, Injectable } from '@nestjs/common';
import { CreateTypeInput } from './dto/create-type.input';
import { UpdateTypeInput } from './dto/update-type.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Repository } from 'typeorm';
import generateEntityId from 'src/helpers/generateEntityId';
import { Connection } from 'typeorm';
import getPaginatorResults from 'src/pagination/paginator-results';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Injectable()
export class TypeService {
  constructor(
    @InjectRepository(Type) private readonly repository: Repository<Type>,
    @Inject(Connection) private readonly connection: Connection,
  ) {}

  async create(input: CreateTypeInput, authorId: string) {
    console.log('author', authorId);

    const newType = await this.repository.save({ ...input, author_id: authorId, id: generateEntityId() });

    // this.connection.query(`CREATE TABLE IF NOT EXISTS ${newType.name} ( id TEXT NOT NULL PRIMARY KEY )`);

    return newType;
  }

  findAll() {
    return this.repository.find();
  }

  async getAllWithPagination(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    return await getPaginatorResults<Type>(this.repository, page, perPage, where, orderBy, 'type');
  }

  findOne(id: string) {
    return `This action returns a #${id} type`;
  }

  update(id: string, input: UpdateTypeInput) {
    return `This action updates a #${id} type`;
  }

  remove(id: string) {
    return `This action removes a #${id} type`;
  }
}

import { Inject, Injectable } from '@nestjs/common';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import generateEntityId from 'src/helpers/generateEntityId';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';
import { Connection } from 'typeorm';
import { TypeService } from 'src/type/type.service';

@Injectable()
export class PropertyService {
  constructor(
    @InjectRepository(Property) private readonly repository: Repository<Property>,
    private readonly typeService: TypeService,
    @Inject(Connection) private readonly connection: Connection,
  ) {}

  async create(input: CreatePropertyInput, authorId: string) {
    const newProperty = this.repository.create({ ...input, author_id: authorId, id: generateEntityId() });
    const type = await this.typeService.findOne(input.type.id);

    if (input.data_type === 'text') {
      let queryText = `ALTER TABLE ${type.name}
      ADD COLUMN ${input.name} VARCHAR(${input.meta?.max ?? '2555'})${input.required ? ' NOT NULL' : ''}
    `;

      if (input.meta?.min) {
        queryText = queryText + ` CHECK (CHAR_LENGTH(${input.name}) >= ${input.meta?.min})`;
      }

      if (input.meta?.max) {
        queryText = queryText + ` CHECK (CHAR_LENGTH(${input.name}) <= ${input.meta?.max})`;
      }

      console.log('query', queryText);

      this.connection.query(queryText);
    }

    // this.connection.query(`ALTER TABLE ${type.name} (
    //   ADD ${input.name}
    // )`)

    return this.repository.save(newProperty);
  }

  findAll() {
    return `This action returns all property`;
  }

  async getAllWithPagination(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    return await getPaginatorResults<Property>(this.repository, page, perPage, where, orderBy, 'property');
  }

  findOne(id: string) {
    return `This action returns a #${id} property`;
  }

  update(id: string, input: UpdatePropertyInput) {
    return `This action updates a #${id} property`;
  }

  remove(id: string) {
    return `This action removes a #${id} property`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';
import generateEntityId from 'src/helpers/generateEntityId';

@Injectable()
export class MessageService {
  constructor(@InjectRepository(Message) private readonly repository: Repository<Message>) {}

  create(input: CreateMessageInput, authorId: string) {
    return this.repository.save({ ...input, author_id: authorId, id: generateEntityId() });
  }

  findAll(page?: number, perPage?: number, where?: PaginatorWhere, orderBy?: PaginatorOrderBy) {
    const input = { where: null, order: null };

    if (where)
      input.where = {
        [where.column]: where.value,
      };
    if (orderBy)
      input.order = {
        [orderBy.column]: orderBy.order,
      };

    if (where?.column.includes('->')) {
      input.where = {
        [where.column.slice(0, where.column.indexOf('->'))]: {
          [where.column.slice(where.column.indexOf('->') + 2)]: where.value,
        },
      };
    }

    return this.repository.find(input);
  }

  async getAllWithPaginate(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    try {
      return await getPaginatorResults<Message>(this.repository, page, perPage, where, orderBy, 'message');
    } catch (e) {
      throw new Error('Invalid data');
    }
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateMessageInput: UpdateMessageInput) {
    const message = await this.repository.save({ ...updateMessageInput, id });
    return this.repository.findOneBy({ id: message.id });
  }

  async remove(id: string) {
    await this.repository.delete(id);
  }
}

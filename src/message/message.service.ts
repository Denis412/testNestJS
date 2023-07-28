import { Injectable } from '@nestjs/common';
import { CreateMessageInput } from './dto/create-message.input';
import { UpdateMessageInput } from './dto/update-message.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Message } from './entities/message.entity';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message) private readonly repository: Repository<Message>,
  ) {}

  create(createMessageInput: CreateMessageInput) {
    return this.repository.save(createMessageInput);
  }

  findAll(
    page?: number,
    perPage?: number,
    where?: PaginatorWhere,
    orderBy?: PaginatorOrderBy,
  ) {
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

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateMessageInput: UpdateMessageInput) {
    const message = await this.repository.save({ ...updateMessageInput, id });
    return this.repository.findOneBy({ id: message.id });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}

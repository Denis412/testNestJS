import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Chat) private readonly repository: Repository<Chat>,
  ) {}

  create(createChatInput: CreateChatInput) {
    return this.repository.save(createChatInput);
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

    return this.repository.find({
      where: {
        ...input.where,
        hided: false,
      },
    });
  }

  async getAllWithPaginate(
    page: number,
    perPage: number,
    where: PaginatorWhere,
    orderBy: PaginatorOrderBy,
  ) {
    try {
      return await getPaginatorResults<Chat>(
        this.repository,
        page,
        perPage,
        where,
        orderBy,
      );
    } catch (e) {
      throw new Error('Invalid data');
    }
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id, hided: false });
  }

  async update(id: number, updateChatInput: UpdateChatInput) {
    const chat = await this.repository.save({ ...updateChatInput, id });
    return this.repository.findOneBy({ id: chat.id });
  }

  async remove(id: number) {
    await this.repository.save({ hided: true, id });
  }
}

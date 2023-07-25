import { Injectable } from '@nestjs/common';
import { CreateChatInput } from './dto/create-chat.input';
import { UpdateChatInput } from './dto/update-chat.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from './entities/chat.entity';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

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
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateChatInput: UpdateChatInput) {
    return this.repository.save({ ...updateChatInput, id });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}

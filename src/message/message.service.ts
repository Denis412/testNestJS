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
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateMessageInput: UpdateMessageInput) {
    return this.repository.save({ ...updateMessageInput, id });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';
import generateEntityId from 'src/helpers/generateEntityId';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async create(input: CreateUserInput) {
    const saltOrRounds = 10;
    input.password = await bcrypt.hash(input.password, saltOrRounds);

    return this.repository.save({ ...input, id: generateEntityId() });
  }

  findAll(where?: PaginatorWhere, orderBy?: PaginatorOrderBy) {
    console.log(where, orderBy);

    return this.repository.find();
  }

  async getAllWithPaginate(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    return await getPaginatorResults<User>(this.repository, page, perPage, where, orderBy, 'user');
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  findOneByEmail(email: string) {
    return this.repository.findOneBy({ email });
  }

  update(id: string, updateUserInput: UpdateUserInput) {
    return this.repository.save({ ...updateUserInput, id });
  }

  async remove(id: string) {
    await this.repository.delete(id);
  }
}

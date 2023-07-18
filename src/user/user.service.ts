import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  create(createUserInput: CreateUserInput) {
    return this.repository.save(createUserInput);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return this.repository.save({ ...updateUserInput, id });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}

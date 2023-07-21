import { Injectable } from '@nestjs/common';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart) private readonly repository: Repository<Cart>,
  ) {}

  create(createCartInput: CreateCartInput) {
    return this.repository.save(createCartInput);
  }

  findAll(where?: PaginatorWhere, orderBy?: PaginatorOrderBy) {
    const input = { where: null, order: null };

    if (where)
      input.where = {
        [where.column]: where.value,
      };
    if (orderBy)
      input.order = {
        [orderBy.column]: orderBy.order,
      };

    return this.repository.find(input);
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateCartInput: UpdateCartInput) {
    return this.repository.save({ ...updateCartInput, id });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}

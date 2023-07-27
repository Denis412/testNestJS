import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
  ) {}

  create(createProductInput: CreateProductInput) {
    return this.repository.save(createProductInput);
  }

  findAll(where?: PaginatorWhere | null, orderBy?: PaginatorOrderBy | null) {
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

  async update(
    id: number,
    updateProductInput: UpdateProductInput,
  ): Promise<Product> {
    const product = await this.repository.save({ ...updateProductInput, id });
    return this.repository.findOneBy({ id: product.id });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}

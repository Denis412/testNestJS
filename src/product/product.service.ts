import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';
import generateEntityId from 'src/helpers/generateEntityId';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
    private readonly userService: UserService,
  ) {}

  create(input: CreateProductInput) {
    return this.repository.save({ ...input, id: generateEntityId() });
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

  async getAllWithPagination(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    return await getPaginatorResults<Product>(this.repository, page, perPage, where, orderBy, 'product');
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  async update(id: string, updateProductInput: UpdateProductInput): Promise<Product> {
    const product = await this.repository.save({ ...updateProductInput, id });
    return this.repository.findOneBy({ id: product.id });
  }

  async getUserForProduct(productId: string): Promise<User> {
    const product = await this.findOne(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.userService.findOne(product.user.id);
  }

  remove(id: string) {
    return this.repository.delete(id);
  }
}

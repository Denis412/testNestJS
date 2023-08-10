import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, ILike, Not } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationInfo } from 'src/pagination/dto/paginator-info.dto';
import getPaginatorResults from 'src/pagination/paginator-results';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
    private readonly userService: UserService,
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

  async getAllWithPagination(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    return await getPaginatorResults<Product>(this.repository, page, perPage, where, orderBy, 'product');
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  async update(id: number, updateProductInput: UpdateProductInput): Promise<Product> {
    const product = await this.repository.save({ ...updateProductInput, id });
    return this.repository.findOneBy({ id: product.id });
  }

  async getUserForProduct(productId: number): Promise<User> {
    const product = await this.findOne(productId);

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.userService.findOne(product.user.id);
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}

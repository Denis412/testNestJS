import { Injectable } from '@nestjs/common';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product) private readonly repository: Repository<Product>,
  ) {}

  create(createProductInput: CreateProductInput) {
    return this.repository.save(createProductInput);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateProductInput: UpdateProductInput) {
    return this.repository.save({ ...updateProductInput, id });
  }

  remove(id: number) {
    return this.repository.delete(id);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  create(createCategoryInput: CreateCategoryInput) {
    return this.repository.save(createCategoryInput);
  }

  findAll(): Promise<Category[]> {
    return this.repository.find();
  }

  findOne(id: number): Promise<Category> {
    return this.repository.findOneBy({ id });
  }

  update(id: number, updateCategoryInput: UpdateCategoryInput) {
    return this.repository.save({ ...updateCategoryInput, id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}

import { Injectable } from '@nestjs/common';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';
import generateEntityId from 'src/helpers/generateEntityId';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly repository: Repository<Category>,
  ) {}

  create(input: CreateCategoryInput, authorId: string) {
    return this.repository.save({ ...input, author_id: authorId, id: generateEntityId() });
  }

  findAll(page?: number, perPage?: number, where?: PaginatorWhere, orderBy?: PaginatorOrderBy) {
    const f = {
      page,
      perPage,
      where,
      orderBy,
    };
    console.log(f);

    return this.repository.find();
  }

  async getAllWithPaginate(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    try {
      return await getPaginatorResults<Category>(this.repository, page, perPage, where, orderBy, 'category');
    } catch (e) {
      throw new Error('Invalid data');
    }
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, updateCategoryInput: UpdateCategoryInput) {
    return this.repository.save({ ...updateCategoryInput, id });
  }

  async remove(id: string) {
    await this.repository.delete(id);
  }
}

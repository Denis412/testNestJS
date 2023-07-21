import { Injectable } from '@nestjs/common';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly repository: Repository<Favorite>,
  ) {}

  create(input: CreateFavoriteInput) {
    return this.repository.save(input);
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

  update(id: number, updateFavoriteInput: UpdateFavoriteInput) {
    return this.repository.save({ ...updateFavoriteInput, id });
  }

  async remove(id: number) {
    await this.repository.delete(id);
  }
}

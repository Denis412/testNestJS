import { Injectable } from '@nestjs/common';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';
import generateEntityId from 'src/helpers/generateEntityId';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly repository: Repository<Favorite>,
  ) {}

  create(input: CreateFavoriteInput) {
    // const entity = this.repository.create({
    //   ...input,
    //   id: generateEntityId(),
    // });

    return this.repository.save({ ...input, id: generateEntityId() });
  }

  findAll(page?: number, perPage?: number, where?: PaginatorWhere, orderBy?: PaginatorOrderBy) {
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

  async getAllWithPaginate(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    try {
      return await getPaginatorResults<Favorite>(this.repository, page, perPage, where, orderBy, 'favorite');
    } catch (e) {
      throw new Error('Invalid data');
    }
  }

  findOne(id: string) {
    return this.repository.findOneBy({ id });
  }

  update(id: string, updateFavoriteInput: UpdateFavoriteInput) {
    return this.repository.save({ ...updateFavoriteInput, id });
  }

  async remove(id: string) {
    await this.repository.delete(id);
  }
}

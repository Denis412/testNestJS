import { Injectable } from '@nestjs/common';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FavoriteService {
  constructor(
    @InjectRepository(Favorite)
    private readonly repository: Repository<Favorite>,
  ) {}

  create(input: CreateFavoriteInput) {
    return this.repository.save(input);
  }

  findAll() {
    return this.repository.find();
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

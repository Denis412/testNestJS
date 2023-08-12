import { Injectable } from '@nestjs/common';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { Repository } from 'typeorm';
import generateEntityId from 'src/helpers/generateEntityId';

@Injectable()
export class PropertyService {
  constructor(@InjectRepository(Property) private readonly repository: Repository<Property>) {}

  create(input: CreatePropertyInput, authorId: string) {
    return this.repository.save({ ...input, author_id: authorId, id: generateEntityId() });
  }

  findAll() {
    return `This action returns all property`;
  }

  findOne(id: string) {
    return `This action returns a #${id} property`;
  }

  update(id: string, input: UpdatePropertyInput) {
    return `This action updates a #${id} property`;
  }

  remove(id: string) {
    return `This action removes a #${id} property`;
  }
}
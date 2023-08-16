import { Injectable } from '@nestjs/common';
import { CreateDynamicTypeInput } from './dto/create-dynamic-type.input';
import { UpdateDynamicTypeInput } from './dto/update-dynamic-type.input';

@Injectable()
export class DynamicTypeService {
  create(createDynamicTypeInput: CreateDynamicTypeInput) {
    return 'This action adds a new dynamicType';
  }

  findAll() {
    return `This action returns all dynamicType`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dynamicType`;
  }

  update(id: number, updateDynamicTypeInput: UpdateDynamicTypeInput) {
    return `This action updates a #${id} dynamicType`;
  }

  remove(id: number) {
    return `This action removes a #${id} dynamicType`;
  }
}

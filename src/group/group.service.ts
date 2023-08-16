import { Injectable } from '@nestjs/common';
import { CreateGroupInput } from './dto/create-group.input';
import { UpdateGroupInput } from './dto/update-group.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import generateEntityId from 'src/helpers/generateEntityId';

@Injectable()
export class GroupService {
  constructor(@InjectRepository(Group) private readonly repository: Repository<Group>) {}

  create(input: CreateGroupInput, authorId: string) {
    return this.repository.save({ ...input, author_id: authorId, id: generateEntityId() });
  }

  async getAllWithPagination(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    return await getPaginatorResults<Group>(this.repository, page, perPage, where, orderBy, 'permissionRule');
  }

  findOne(id: string) {
    return `This action returns a #${id} group`;
  }

  update(id: string, input: UpdateGroupInput) {
    return `This action updates a #${id} group`;
  }

  remove(id: string) {
    return `This action removes a #${id} group`;
  }
}

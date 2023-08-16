import { Injectable } from '@nestjs/common';
import { CreatePermissionRuleInput } from './dto/create-permission-rule.input';
import { UpdatePermissionRuleInput } from './dto/update-permission-rule.input';
import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRule } from './entities/permission-rule.entity';
import { Repository } from 'typeorm';
import generateEntityId from 'src/helpers/generateEntityId';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import getPaginatorResults from 'src/pagination/paginator-results';

@Injectable()
export class PermissionRuleService {
  constructor(@InjectRepository(PermissionRule) private readonly repository: Repository<PermissionRule>) {}

  create(input: CreatePermissionRuleInput, authorId: string) {
    const permission = this.repository.findOneBy({
      model_type: input.model_type,
      type_name: input.type_name,
      model_id: input.model_id,
      owner_id: input.owner_id,
    });

    if (!permission) return this.repository.save({ ...input, author_id: authorId, id: generateEntityId() });

    return permission;
  }

  async getAllWithPagination(page: number, perPage: number, where: PaginatorWhere, orderBy: PaginatorOrderBy) {
    return await getPaginatorResults<PermissionRule>(this.repository, page, perPage, where, orderBy, 'permissionRule');
  }

  findOne(id: string) {
    return `This action returns a #${id} permissionRule`;
  }

  update(id: string, input: UpdatePermissionRuleInput) {
    return this.repository.save({ ...input, id });
  }

  remove(id: string) {
    return `This action removes a #${id} permissionRule`;
  }
}

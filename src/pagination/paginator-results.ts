import PaginatorOrderBy from 'src/types/orderBy';
import PaginatorWhere from 'src/types/where';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationInfo } from './dto/paginator-info.dto';

function buildCondition<T>(where: PaginatorWhere, qb: SelectQueryBuilder<T>, call?: string) {
  if (where?.and) {
    qb.andWhere(
      new Brackets((subQb) => {
        for (const part of where.and!) {
          buildCondition(part, subQb, 'andWhere');
        }
      }),
    );
  } else if (where?.or) {
    qb.orWhere(
      new Brackets((subQb) => {
        for (const part of where.or!) {
          buildCondition(part, subQb, 'orWhere');
        }
      }),
    );
  } else {
    if (where?.operator === 'FTS') {
      qb[call](`${where.column} LIKE '%${where.value}%'`);
    } else if (where.operator === 'EQ') {
      qb[call](`${where.column} = '${where.value}'`);
    } else if (where.operator === 'NEQ') {
      qb[call](`${where.column} != '${where.value}'`);
    }
  }
}

export default async function getPaginatorResults<T>(
  repository: Repository<T>,
  page: number,
  perPage: number,
  where: PaginatorWhere,
  orderBy: PaginatorOrderBy,
) {
  const query = repository.createQueryBuilder();

  if (where) buildCondition(where, query, 'orWhere');
  if (orderBy) query.orderBy(`${orderBy.column}`, orderBy.order);

  const [entities, totalElements] = await query
    .take(perPage)
    .skip((page - 1) * perPage)
    .getManyAndCount();

  const totalPages = Math.ceil(totalElements / perPage);

  const paginationMeta: PaginationInfo = {
    page,
    perPage,
    count: totalElements,
    hasMorePages: totalPages > page,
    totalPages: totalPages,
  };

  return {
    data: entities,
    paginatorInfo: paginationMeta,
  };
}

import PaginatorOrderBy from 'src/types/orderBy';
import PaginatorWhere from 'src/types/where';
import { Brackets, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationInfo } from './dto/paginator-info.dto';

function buildCondition(where: PaginatorWhere, qb, entity: string, call?: string) {
  if (where?.and) {
    qb.andWhere(
      new Brackets((subQb) => {
        for (const part of where.and!) {
          buildCondition(part, subQb, entity, 'andWhere');
        }
      }),
    );
  } else if (where?.or) {
    qb.orWhere(
      new Brackets((subQb) => {
        for (const part of where.or!) {
          buildCondition(part, subQb, entity, 'orWhere');
        }
      }),
    );
  } else {
    if (where?.operator === 'FTS') {
      qb[call](`${qb.alias}.${where.column} LIKE '%${where.value}%'`);
    } else if (where.operator === 'EQ') {
      qb[call](`${qb.alias}.${where.column} = '${where.value}'`);
    } else if (where.operator === 'NEQ') {
      qb[call](`${qb.alias}.${where.column} != '${where.value}'`);
    }
  }
}

export default async function getPaginatorResults<T>(
  repository: Repository<T>,
  page: number,
  perPage: number,
  where: PaginatorWhere,
  orderBy: PaginatorOrderBy,
  entity?: string,
) {
  const query = repository.createQueryBuilder('product').leftJoinAndSelect('product.user', 'user');
  console.log('query', query.getQuery());

  if (where) buildCondition(where, query, 'product', 'orWhere');
  if (orderBy) query.orderBy(`product.${orderBy.column}`, orderBy.order);

  const [entities, totalElements] = await query
    .take(perPage)
    .skip((page - 1) * perPage)

    .getManyAndCount();

  console.log('results', entities);

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

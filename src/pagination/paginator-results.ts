import PaginatorOrderBy from 'src/types/orderBy';
import PaginatorWhere from 'src/types/where';
import { Brackets, EntityMetadata, Repository, SelectQueryBuilder } from 'typeorm';
import { PaginationInfo } from './dto/paginator-info.dto';

function buildCondition(where: PaginatorWhere, qb, entity: string, call?: string) {
  if (where?.and) {
    qb.andWhere(
      new Brackets((subQb) => {
        where.and.forEach((partWhere) => buildCondition(partWhere, subQb, entity, 'andWhere'));
      }),
    );
  } else if (where?.or) {
    qb.orWhere(
      new Brackets((subQb) => {
        where.and.forEach((partWhere) => buildCondition(partWhere, subQb, entity, 'orWhere'));
      }),
    );
  } else {
    switch (where.operator) {
      case 'IN':
        qb[call](`${qb.alias}.${where.column} LIKE '%${where.value}%'`);
        break;
      case 'FTS':
        qb[call](`MATCH (${qb.alias}.${where.column}) AGAINST ('${where.value}')`);
        break;
      case 'EQ':
        qb[call](`${qb.alias}.${where.column} = '${where.value}'`);
        break;
      case 'NEQ':
        qb[call](`${qb.alias}.${where.column} != '${where.value}'`);
        break;
    }
  }
}

async function autoInnerJoinAndSelect<T>(
  qb: SelectQueryBuilder<T>,
  metadata: EntityMetadata,
  alias: string,
  level = 0,
) {
  if (level >= 4) return;

  metadata.relations.forEach((relation) => {
    const relationAlias = `${alias}-${relation.propertyName}`;
    qb.innerJoinAndSelect(`${alias}.${relation.propertyName}`, relationAlias);

    // console.log('relations', relationAlias, `${alias}.${relation.propertyName}`);

    const joinedMetadata = qb.connection.getMetadata(relation.type);
    autoInnerJoinAndSelect(qb, joinedMetadata, relationAlias, level + 1);
  });
}

export default async function getPaginatorResults<T>(
  repository: Repository<T>,
  page: number,
  perPage: number,
  where: PaginatorWhere,
  orderBy: PaginatorOrderBy,
  entity?: string,
) {
  const metadata = repository.metadata;

  const query = repository.createQueryBuilder(entity);

  await autoInnerJoinAndSelect(query, metadata, entity);

  if (where) buildCondition(where, query, entity, 'orWhere');
  if (orderBy) query.orderBy(`${entity}.${orderBy.column}`, orderBy.order);

  console.log('query', query.getQuery());

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

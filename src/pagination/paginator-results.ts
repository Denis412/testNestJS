import PaginatorOrderBy from 'src/types/orderBy';
import PaginatorWhere from 'src/types/where';
import { ILike, Not, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationInfo } from './dto/paginator-info.dto';

export default async function getPaginatorResults<T>(
  repository: Repository<T>,
  page: number,
  perPage: number,
  where: PaginatorWhere,
  orderBy: PaginatorOrderBy,
) {
  const filters = [];
  const newWhere = [where];
  const newOrderBy = [orderBy];

  if (where) {
    newWhere.forEach(({ column, operator, value }) => {
      switch (operator) {
        case 'EQ':
          filters.push({ [column]: value });
          break;
        case 'NEQ':
          filters.push({ [column]: Not(value) });
          break;
        case 'FTS':
          filters.push({ [column]: ILike(`%${value}%`) });
          break;
        default:
          break;
      }
    });
  }

  const paginationResult = await paginate<T>(
    repository,
    {
      page: page || 1,
      limit: perPage || 50,
    },
    {
      where: filters.length ? filters : {},
      order: orderBy
        ? newOrderBy.reduce(
            (acc, { column, order }) => ({
              ...acc,
              [column]: order,
            }),
            {},
          )
        : {},
    },
  );

  const paginationMeta: PaginationInfo = {
    page: paginationResult.meta.currentPage,
    perPage: paginationResult.meta.itemsPerPage,
    count: paginationResult.meta.totalItems,
    hasMorePages:
      paginationResult.meta.totalPages > paginationResult.meta.currentPage,
    totalPages: paginationResult.meta.totalPages,
  };

  return {
    data: paginationResult.items,
    paginatorInfo: paginationMeta,
  };
}
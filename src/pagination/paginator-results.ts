import PaginatorOrderBy from 'src/types/orderBy';
import PaginatorWhere from 'src/types/where';
import { ILike, Not, Repository } from 'typeorm';
import { paginate } from 'nestjs-typeorm-paginate';
import { PaginationInfo } from './dto/paginator-info.dto';

function generateWhere(where: PaginatorWhere | PaginatorWhere[]) {
  const filters = [];
  const newWhere = Array.isArray(where) ? where : [where];

  if (!Array.isArray(where) && where.and) {
    filters.push({});

    if (where.and.find((wh) => wh.and)) {
      for (const andWhere of where.and) {
        const andGenerated = generateWhere(andWhere);
        const obj = Object.values(andGenerated)[0];

        filters[filters.length - 1] = {
          ...filters[filters.length - 1],
          [Object.keys(obj)[0]]: Object.values(obj)[0],
        };
      }
    }
    if (where.and.find((wh) => wh.or)) {
      for (const orWhere of where.and) {
        const orGenerated = generateWhere(orWhere);

        filters[filters.length - 1] = [...[filters[filters.length - 1]], orGenerated[0]];
      }
    } else
      for (const item of generateWhere(where.and)) {
        filters.at(-1)[Object.keys(item)[0]] = Object.values(item)[0];
      }
  }

  if (!Array.isArray(where) && where.or) {
    filters.push([]);

    if (where.or?.[0].and) filters.at(-1).push(generateWhere(where.or[0].and));
    if (where.or?.[0].or) filters.at(-1).push(generateWhere(where.or[0].or));
    else
      for (const item of generateWhere(where.or)) {
        filters.at(-1).push(item);
      }
  }

  console.log('filters', JSON.stringify(filters, null, 2));

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

  return filters;
}

export default async function getPaginatorResults<T>(
  repository: Repository<T>,
  page: number,
  perPage: number,
  where: PaginatorWhere,
  orderBy: PaginatorOrderBy,
) {
  let filters = [];
  // const newWhere = [where];
  const newOrderBy = [orderBy];

  filters = generateWhere(where);

  // if (where) {
  //   newWhere.forEach(({ column, operator, value }) => {
  //     switch (operator) {
  //       case 'EQ':
  //         filters.push({ [column]: value });
  //         break;
  //       case 'NEQ':
  //         filters.push({ [column]: Not(value) });
  //         break;
  //       case 'FTS':
  //         filters.push({ [column]: ILike(`%${value}%`) });
  //         break;
  //       default:
  //         break;
  //     }
  //   });
  // }

  const paginationResult = await paginate<T>(
    repository,
    {
      page: page || 1,
      limit: perPage || 50,
    },
    {
      where: filters,
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
    hasMorePages: paginationResult.meta.totalPages > paginationResult.meta.currentPage,
    totalPages: paginationResult.meta.totalPages,
  };

  return {
    data: paginationResult.items,
    paginatorInfo: paginationMeta,
  };
}

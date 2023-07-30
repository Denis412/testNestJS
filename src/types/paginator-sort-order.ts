import { registerEnumType } from '@nestjs/graphql';

export enum PaginatorSortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

registerEnumType(PaginatorSortOrder, {
  name: 'PaginatorSortOrder',
});

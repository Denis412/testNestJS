import { registerEnumType } from '@nestjs/graphql';

export enum PaginatorWhereOperator {
  EQ = 'EQ',
  NEQ = 'NEQ',
  FTS = 'FTS',
  IN = 'IN',
}

registerEnumType(PaginatorWhereOperator, {
  name: 'PaginatorWhereOperator',
});

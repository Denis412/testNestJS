import { registerEnumType } from '@nestjs/graphql';

export enum PaginatorWhereOperator {
  EQ = 'EQ',
  NEQ = 'NEQ',
  FTS = 'FTS',
}

registerEnumType(PaginatorWhereOperator, {
  name: 'PaginatorWhereOperator',
});

import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { PermissionRuleService } from '../permission-rule.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PaginatorWhereOperator } from 'src/types/paginator-where-operator';
import { PaginatorSortOrder } from 'src/types/paginator-sort-order';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly permissionRuleService: PermissionRuleService) {}

  async canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const operationName = ctx.getInfo().path.key;
    const action = operationName.slice(0, operationName.indexOf('_'));
    const entity = operationName.slice(operationName.indexOf('_') + 1);

    const variables = ctx.getContext().req.body.variables;

    const permissions = await this.permissionRuleService.getAllWithPagination(
      1,
      1,
      {
        and: [
          {
            column: 'type_name',
            operator: PaginatorWhereOperator.EQ,
            value: entity,
          },
        ],
      },
      {
        column: 'created_at',
        order: PaginatorSortOrder.DESC,
      },
    );

    if (action === 'create') {
      const permission = permissions.data.find(
        (permission) => permission.model_type === 'type' && permission.level === 7,
      );

      if (!permission) throw new UnauthorizedException('dont have permissions');
    } else if (action === 'update') {
      const permission = permissions.data.find((permission) => {
        return (
          (permission.model_type === 'type' && permission.level === 5) ||
          (permission.model_type === 'object' && permission.model_id === variables.id && permission.level >= 5)
        );
      });

      if (!permission) throw new UnauthorizedException('dont have permissions');
    } else if (action === 'delete') {
      const permission = permissions.data.find((permission) => {
        return (
          (permission.model_type === 'type' && permission.level === 7) ||
          (permission.model_type === 'object' && permission.model_id === variables.id && permission.level === 7)
        );
      });

      if (!permission) throw new UnauthorizedException('dont have permissions');
    } else {
      const permission = permissions.data.find((permission) => {
        return (
          (permission.model_type === 'type' && permission.level >= 4) ||
          (permission.model_type === 'object' && permission.model_id === variables.id && permission.level >= 4)
        );
      });

      if (!permission) throw new UnauthorizedException('dont have permissions');
    }

    console.log('context', permissions);

    return true;
  }
}

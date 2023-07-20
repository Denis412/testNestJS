import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export function MyAuth() {
  return applyDecorators(
    SetMetadata('roles', ['authenticated']), // Если нужно, можно указать метаданные или роли
    UseGuards(AuthGuard('local')), // Используем AuthGuard с переданным стратегией (например, 'local')
  );
}

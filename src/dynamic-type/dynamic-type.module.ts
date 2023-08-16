import { Module } from '@nestjs/common';
import { DynamicTypeService } from './dynamic-type.service';
import { DynamicTypeResolver } from './dynamic-type.resolver';

@Module({
  providers: [DynamicTypeResolver, DynamicTypeService]
})
export class DynamicTypeModule {}

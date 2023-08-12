import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';
import { TypeModule } from 'src/type/type.module';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property, UsedRefresh]), TypeModule],
  providers: [PropertyResolver, PropertyService],
})
export class PropertyModule {}

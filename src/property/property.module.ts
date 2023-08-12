import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from './entities/property.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Property])],
  providers: [PropertyResolver, PropertyService],
})
export class PropertyModule {}
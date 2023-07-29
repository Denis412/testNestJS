import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductResolver } from './product.resolver';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';
import { AuthModule } from 'src/auth/auth.module';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, UsedRefresh])],
  providers: [ProductResolver, ProductService],
})
export class ProductModule {}

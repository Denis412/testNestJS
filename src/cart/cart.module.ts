import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, UsedRefresh])],
  providers: [CartResolver, CartService],
})
export class CartModule {}

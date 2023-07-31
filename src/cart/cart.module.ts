import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartResolver } from './cart.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Cart, UsedRefresh]), JwtModule],
  providers: [CartResolver, CartService],
})
export class CartModule {}

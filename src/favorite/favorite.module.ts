import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite, UsedRefresh])],
  providers: [FavoriteResolver, FavoriteService],
})
export class FavoriteModule {}

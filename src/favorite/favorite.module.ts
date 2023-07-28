import { Module } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { FavoriteResolver } from './favorite.resolver';
import { Favorite } from './entities/favorite.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  providers: [FavoriteResolver, FavoriteService],
})
export class FavoriteModule {}

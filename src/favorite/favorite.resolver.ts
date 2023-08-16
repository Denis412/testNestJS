import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { PaginatorFavorite } from './entities/paginator.entity';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';

@UseGuards(JWTGuard)
@UseInterceptors(CheckValidTokenInterceptor)
@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Mutation(() => Favorite, { name: 'create_favorite' })
  createFavorite(@Args('input') input: CreateFavoriteInput) {
    return this.favoriteService.create(input);
  }

  @Query(() => PaginatorFavorite, { name: 'paginate_favorite' })
  getAllWithPaginate(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args('perPage', { type: () => Int, nullable: true, defaultValue: 50 })
    perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy: PaginatorOrderBy,
  ) {
    return this.favoriteService.getAllWithPaginate(page, perPage, where, orderBy);
  }

  @Query(() => Favorite, { name: 'get_favorite' })
  findOne(@Args('id') id: string) {
    return this.favoriteService.findOne(id);
  }

  @Mutation(() => Favorite, { name: 'update_favorite' })
  updateFavorite(@Args('input') updateFavoriteInput: UpdateFavoriteInput, @Args('id') id: string) {
    return this.favoriteService.update(id, updateFavoriteInput);
  }

  @Mutation(() => Favorite, { name: 'delete_favorite' })
  async deleteFavorite(@Args('id') id: string): Promise<{ id: string }> {
    await this.favoriteService.remove(id);

    return {
      id,
    };
  }
}

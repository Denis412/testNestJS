import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { FavoriteService } from './favorite.service';
import { Favorite } from './entities/favorite.entity';
import { CreateFavoriteInput } from './dto/create-favorite.input';
import { UpdateFavoriteInput } from './dto/update-favorite.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { PaginatorFavorite } from './entities/paginator.entity';

@UseGuards(JWTGuard)
@Resolver(() => Favorite)
export class FavoriteResolver {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Mutation(() => Favorite)
  createFavorite(@Args('input') input: CreateFavoriteInput) {
    return this.favoriteService.create(input);
  }

  @Query(() => [Favorite], { name: 'favorites' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage?: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.favoriteService.findAll(page, perPage, where, orderBy);
  }

  @Query(() => PaginatorFavorite, { name: 'paginateFavorites' })
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
    return this.favoriteService.getAllWithPaginate(
      page,
      perPage,
      where,
      orderBy,
    );
  }

  @Query(() => Favorite, { name: 'favorite' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.favoriteService.findOne(id);
  }

  @Mutation(() => Favorite)
  updateFavorite(
    @Args('input') updateFavoriteInput: UpdateFavoriteInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.favoriteService.update(id, updateFavoriteInput);
  }

  @Mutation(() => Favorite)
  async deleteFavorite(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<{ id: number }> {
    await this.favoriteService.remove(id);

    return {
      id,
    };
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { PaginatorCategory } from './entities/paginator.entity';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';

@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Category)
  createCategory(@Args('input') input: CreateCategoryInput) {
    return this.categoryService.create(input);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page?: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage?: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.categoryService.findAll(page, perPage, where, orderBy);
  }

  @Query(() => PaginatorCategory, { name: 'paginateCategory' })
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
    return this.categoryService.getAllWithPaginate(page, perPage, where, orderBy);
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Category)
  updateCategory(@Args('input') input: UpdateCategoryInput, @Args('id') id: string) {
    return this.categoryService.update(id, input);
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Category)
  async deleteCategory(@Args('id') id: string) {
    await this.categoryService.remove(id);
    return {
      id,
    };
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './dto/create-category.input';
import { UpdateCategoryInput } from './dto/update-category.input';
import { Categories } from './entities/categories.entity';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';

@UseGuards(JWTGuard)
@Resolver(() => Category)
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

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

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoryService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('input') input: UpdateCategoryInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.categoryService.update(id, input);
  }

  @Mutation(() => Category)
  async deleteCategory(@Args('id', { type: () => Int }) id: number) {
    await this.categoryService.remove(id);
    return {
      id,
    };
  }
}

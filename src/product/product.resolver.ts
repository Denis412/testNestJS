import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { PaginatorProduct } from './entities/paginator.entity';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Product)
  createProduct(@Args('input') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @Query(() => [Product], { name: 'products' })
  findAll(
    @Args('page', { type: () => Int, nullable: true, defaultValue: 1 })
    page: number,
    @Args('perPage', { type: () => Int, nullable: true, defaultValue: 50 })
    perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy: PaginatorOrderBy,
  ) {
    return this.productService.findAll(where, orderBy);
  }

  @Query(() => PaginatorProduct, { name: 'paginateProducts' })
  async getAllWithPaginate(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.productService.getAllWithPagination(
      page,
      perPage,
      where,
      orderBy,
    );
  }

  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Product> | Promise<null> {
    return this.productService.findOne(id);
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Product)
  updateProduct(
    @Args('input', { type: () => UpdateProductInput })
    updateProductInput: UpdateProductInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Product)
  async deleteProduct(@Args('id', { type: () => Int }) id: number) {
    await this.productService.remove(id);

    return {
      id,
    };
  }
}

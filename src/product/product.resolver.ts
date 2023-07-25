import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProductService } from './product.service';
import { Product } from './entities/product.entity';
import { CreateProductInput } from './dto/create-product.input';
import { UpdateProductInput } from './dto/update-product.input';
import { UseGuards } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @Mutation(() => Product)
  createProduct(@Args('input') createProductInput: CreateProductInput) {
    return this.productService.create(createProductInput);
  }

  @UseGuards(JWTGuard)
  @Query(() => [Product], { name: 'products' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.productService.findAll(where, orderBy);
  }

  @Query(() => Product, { name: 'product' })
  findOne(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Product> | Promise<null> {
    return this.productService.findOne(id);
  }

  @Mutation(() => Product)
  updateProduct(
    @Args('input', { type: () => UpdateProductInput })
    updateProductInput: UpdateProductInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @Mutation(() => Product)
  deleteProduct(@Args('id', { type: () => Int }) id: number) {
    return this.productService.remove(id);
  }
}

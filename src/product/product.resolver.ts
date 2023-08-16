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
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PermissionGuard } from 'src/permission-rule/guards/permission.guard';

@UseGuards(PermissionGuard)
@Resolver(() => Product)
export class ProductResolver {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Product, { name: 'create_product' })
  createProduct(@Args('input') createProductInput: CreateProductInput, @CurrentUser() userId: string) {
    return this.productService.create(createProductInput, userId);
  }

  @Query(() => PaginatorProduct, { name: 'paginate_product' })
  async getAllWithPaginate(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.productService.getAllWithPagination(page, perPage, where, orderBy);
  }

  @Query(() => Product, { name: 'get_product' })
  findOne(@Args('id') id: string): Promise<Product> | Promise<null> {
    return this.productService.findOne(id);
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Product, { name: 'update_product' })
  updateProduct(
    @Args('input', { type: () => UpdateProductInput })
    updateProductInput: UpdateProductInput,
    @Args('id') id: string,
  ) {
    return this.productService.update(id, updateProductInput);
  }

  @UseGuards(JWTGuard)
  @UseInterceptors(CheckValidTokenInterceptor)
  @Mutation(() => Product, { name: 'delete_product' })
  async deleteProduct(@Args('id') id: string) {
    await this.productService.remove(id);

    return {
      id,
    };
  }
}

import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';
import { UseGuards, UseInterceptors } from '@nestjs/common';
import { JWTGuard } from 'src/auth/guards/JWTGuard';
import { PaginatorCart } from './entities/paginator.entity';
import { CheckValidTokenInterceptor } from 'src/interceptors/check-valid-token.interceptor';

@UseGuards(JWTGuard)
@UseInterceptors(CheckValidTokenInterceptor)
@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  createCart(@Args('input') input: CreateCartInput) {
    return this.cartService.create(input);
  }

  @Query(() => [Cart], { name: 'carts' })
  findAll(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy: PaginatorOrderBy,
  ) {
    return this.cartService.findAll(page, perPage, where, orderBy);
  }

  @Query(() => PaginatorCart, { name: 'paginateCart' })
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
    return this.cartService.getAllWithPaginate(page, perPage, where, orderBy);
  }

  @Query(() => Cart, { name: 'cart' })
  findOne(@Args('id') id: string) {
    return this.cartService.findOne(id);
  }

  // @Mutation(() => Cart)
  // updateCart(@Args('input') input: UpdateCartInput, @Args('id') id: string) {
  //   return this.cartService.update(id, input);
  // }

  @Mutation(() => Cart)
  async deleteCart(@Args('id') id: string): Promise<{ id: string }> {
    await this.cartService.remove(id);

    return {
      id,
    };
  }
}

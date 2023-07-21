import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CartService } from './cart.service';
import { Cart } from './entities/cart.entity';
import { CreateCartInput } from './dto/create-cart.input';
import { UpdateCartInput } from './dto/update-cart.input';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Resolver(() => Cart)
export class CartResolver {
  constructor(private readonly cartService: CartService) {}

  @Mutation(() => Cart)
  createCart(@Args('input') input: CreateCartInput) {
    return this.cartService.create(input);
  }

  @Query(() => [Cart], { name: 'carts' })
  findAll(
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.cartService.findAll(where, orderBy);
  }

  @Query(() => Cart, { name: 'cart' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.findOne(id);
  }

  @Mutation(() => Cart)
  updateCart(@Args('input') input: UpdateCartInput, @Args('id') id: number) {
    return this.cartService.update(id, input);
  }

  @Mutation(() => Cart)
  removeCart(@Args('id', { type: () => Int }) id: number) {
    return this.cartService.remove(id);
  }
}

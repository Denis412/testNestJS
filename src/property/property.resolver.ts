import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { PaginatorProperty } from './entities/paginator.entity';
import PaginatorWhere from 'src/types/where';
import PaginatorOrderBy from 'src/types/orderBy';

@Resolver(() => Property)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Mutation(() => Property)
  createProperty(@Args('input') input: CreatePropertyInput, @CurrentUser() userId: string) {
    return this.propertyService.create(input, userId);
  }

  @Query(() => [Property], { name: 'property' })
  findAll() {
    return this.propertyService.findAll();
  }

  @Query(() => PaginatorProperty, { name: 'paginateProperty' })
  async getAllWithPaginate(
    @Args('page', { type: () => Int, nullable: true }) page: number,
    @Args('perPage', { type: () => Int, nullable: true }) perPage: number,
    @Args('where', { type: () => PaginatorWhere, nullable: true })
    where?: PaginatorWhere,
    @Args('orderBy', { type: () => PaginatorOrderBy, nullable: true })
    orderBy?: PaginatorOrderBy,
  ) {
    return this.propertyService.getAllWithPagination(page, perPage, where, orderBy);
  }

  @Query(() => Property, { name: 'property' })
  findOne(@Args('id') id: string) {
    return this.propertyService.findOne(id);
  }

  @Mutation(() => Property)
  updateProperty(@Args('input') input: UpdatePropertyInput, @Args('id') id: string) {
    return this.propertyService.update(id, input);
  }

  @Mutation(() => Property)
  removeProperty(@Args('id') id: string) {
    return this.propertyService.remove(id);
  }
}

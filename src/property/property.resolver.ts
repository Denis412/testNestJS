import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';
import { CurrentUser } from 'src/decorators/current-user.decorator';

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

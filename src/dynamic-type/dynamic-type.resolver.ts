import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DynamicTypeService } from './dynamic-type.service';
import { DynamicType } from './entities/dynamic-type.entity';
import { CreateDynamicTypeInput } from './dto/create-dynamic-type.input';
import { UpdateDynamicTypeInput } from './dto/update-dynamic-type.input';

@Resolver(() => DynamicType)
export class DynamicTypeResolver {
  constructor(private readonly dynamicTypeService: DynamicTypeService) {}

  @Mutation(() => DynamicType)
  createDynamicType(@Args('createDynamicTypeInput') createDynamicTypeInput: CreateDynamicTypeInput) {
    return this.dynamicTypeService.create(createDynamicTypeInput);
  }

  @Query(() => [DynamicType], { name: 'dynamicType' })
  findAll() {
    return this.dynamicTypeService.findAll();
  }

  @Query(() => DynamicType, { name: 'dynamicType' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dynamicTypeService.findOne(id);
  }

  @Mutation(() => DynamicType)
  updateDynamicType(@Args('updateDynamicTypeInput') updateDynamicTypeInput: UpdateDynamicTypeInput) {
    return this.dynamicTypeService.update(updateDynamicTypeInput.id, updateDynamicTypeInput);
  }

  @Mutation(() => DynamicType)
  removeDynamicType(@Args('id', { type: () => Int }) id: number) {
    return this.dynamicTypeService.remove(id);
  }
}

import { Test, TestingModule } from '@nestjs/testing';
import { DynamicTypeResolver } from './dynamic-type.resolver';
import { DynamicTypeService } from './dynamic-type.service';

describe('DynamicTypeResolver', () => {
  let resolver: DynamicTypeResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicTypeResolver, DynamicTypeService],
    }).compile();

    resolver = module.get<DynamicTypeResolver>(DynamicTypeResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

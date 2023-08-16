import { Test, TestingModule } from '@nestjs/testing';
import { DynamicTypeService } from './dynamic-type.service';

describe('DynamicTypeService', () => {
  let service: DynamicTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DynamicTypeService],
    }).compile();

    service = module.get<DynamicTypeService>(DynamicTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

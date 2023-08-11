import { Test, TestingModule } from '@nestjs/testing';
import { PermissionRuleService } from './permission-rule.service';

describe('PermissionRuleService', () => {
  let service: PermissionRuleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionRuleService],
    }).compile();

    service = module.get<PermissionRuleService>(PermissionRuleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { PermissionRuleResolver } from './permission-rule.resolver';
import { PermissionRuleService } from './permission-rule.service';

describe('PermissionRuleResolver', () => {
  let resolver: PermissionRuleResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionRuleResolver, PermissionRuleService],
    }).compile();

    resolver = module.get<PermissionRuleResolver>(PermissionRuleResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

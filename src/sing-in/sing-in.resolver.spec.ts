import { Test, TestingModule } from '@nestjs/testing';
import { SingInResolver } from './sing-in.resolver';
import { SingInService } from './sing-in.service';

describe('SingInResolver', () => {
  let resolver: SingInResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingInResolver, SingInService],
    }).compile();

    resolver = module.get<SingInResolver>(SingInResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

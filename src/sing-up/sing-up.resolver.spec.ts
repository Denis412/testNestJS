import { Test, TestingModule } from '@nestjs/testing';
import { SingUpResolver } from './sing-up.resolver';
import { SingUpService } from './sing-up.service';

describe('SingUpResolver', () => {
  let resolver: SingUpResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SingUpResolver, SingUpService],
    }).compile();

    resolver = module.get<SingUpResolver>(SingUpResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { Auth1Resolver } from './auth.resolver';
import { Auth1Service } from './auth.service';

describe('Auth1Resolver', () => {
  let resolver: Auth1Resolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth1Resolver, Auth1Service],
    }).compile();

    resolver = module.get<Auth1Resolver>(Auth1Resolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

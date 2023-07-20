import { Test, TestingModule } from '@nestjs/testing';
import { Auth1Service } from './auth1.service';

describe('Auth1Service', () => {
  let service: Auth1Service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Auth1Service],
    }).compile();

    service = module.get<Auth1Service>(Auth1Service);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

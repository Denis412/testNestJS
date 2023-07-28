import { Test, TestingModule } from '@nestjs/testing';
import { WebsocketsResolver } from './websockets.resolver';
import { WebsocketsService } from './websockets.service';

describe('WebsocketsResolver', () => {
  let resolver: WebsocketsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebsocketsResolver, WebsocketsService],
    }).compile();

    resolver = module.get<WebsocketsResolver>(WebsocketsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});

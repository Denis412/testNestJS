import { Module } from '@nestjs/common';
import { WebsocketsService } from './websockets.service';
import { WebsocketsResolver } from './websockets.resolver';

@Module({
  providers: [WebsocketsResolver, WebsocketsService],
})
export class WebsocketsModule {}

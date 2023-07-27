import { Module } from '@nestjs/common';
import { myGateway } from './gateway';
import { MessageBody, SubscribeMessage } from '@nestjs/websockets';

@Module({
  providers: [myGateway],
})
export class GatewayModule {}

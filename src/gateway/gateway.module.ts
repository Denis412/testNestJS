import { Module } from '@nestjs/common';
import { myGateway } from './gateway';
import { MessageModule } from 'src/message/message.module';

@Module({
  imports: [MessageModule],
  providers: [myGateway],
})
export class GatewayModule {}

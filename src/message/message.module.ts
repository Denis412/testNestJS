import { Module } from '@nestjs/common';
import { MessageService } from './message.service';
import { MessageResolver } from './message.resolver';
import { Message } from './entities/message.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Message])],
  providers: [MessageResolver, MessageService],
})
export class MessageModule {}

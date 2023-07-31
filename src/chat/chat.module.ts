import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatResolver } from './chat.resolver';
import { Chat } from './entities/chat.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Chat, UsedRefresh]),
    UserModule,
    JwtModule,
  ],
  providers: [ChatResolver, ChatService],
})
export class ChatModule {}

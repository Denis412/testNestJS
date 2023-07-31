import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsedRefresh]), JwtModule],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

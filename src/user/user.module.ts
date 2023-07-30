import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsedRefresh } from 'src/auth/entities/used-refresh.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, UsedRefresh])],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}

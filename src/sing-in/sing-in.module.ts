import { Module } from '@nestjs/common';
import { SingInService } from './sing-in.service';
import { SingInResolver } from './sing-in.resolver';
import { UserModule } from 'src/user/user.module';
import { SingIn } from './entities/sing-in.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([SingIn])],
  providers: [SingInResolver, SingInService],
})
export class SingInModule {}

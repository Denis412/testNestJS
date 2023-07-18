import { Module } from '@nestjs/common';
import { SingUpService } from './sing-up.service';
import { SingUpResolver } from './sing-up.resolver';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingUp } from './entities/sing-up.entity';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([SingUp])],
  providers: [SingUpResolver, SingUpService],
})
export class SingUpModule {}

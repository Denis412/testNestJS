import { Module } from '@nestjs/common';
import { Auth1Service } from './auth1.service';
import { Auth1Resolver } from './auth1.resolver';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './local.strategy';
import { JWTStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingIn } from './entities/sign-in.entity';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([SingIn]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [Auth1Resolver, Auth1Service, LocalStrategy, JWTStrategy],
})
export class Auth1Module {}

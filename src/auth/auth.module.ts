import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth1Resolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
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
  providers: [Auth1Resolver, AuthService, LocalStrategy, JWTStrategy],
})
export class Auth1Module {}

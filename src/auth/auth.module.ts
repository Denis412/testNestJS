import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LocalStrategy } from './strategies/local.strategy';
import { JWTStrategy } from './strategies/jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SingIn } from './entities/sign-in.entity';
import { UsedRefresh } from './entities/used-refresh.entity';
import { JWTRefreshStrategy } from './strategies/refresh.strategy';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([SingIn, UsedRefresh]),
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [
    AuthResolver,
    AuthService,
    LocalStrategy,
    JWTStrategy,
    JWTRefreshStrategy,
  ],
})
export class AuthModule {}

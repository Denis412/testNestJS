import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { SingIn } from './entities/sign-in.entity';
import { AuthTokens } from './entities/auth-tokens.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsedRefresh } from './entities/used-refresh.entity';
import { Repository } from 'typeorm';
import { UsedRefreshCreateInput } from './dto/used-refresh.input';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from './constants';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsedRefresh)
    private readonly repository: Repository<UsedRefresh>,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async createUsedRefresh(input: UsedRefreshCreateInput) {
    return this.repository.save(input);
  }

  async isTokenExpired(token: string) {
    try {
      <jwt.JwtPayload>jwt.verify(token, jwtConstants.secret);
    } catch (error) {
      return true;
    }
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password))) return await this.login(user);

    return null;
  }

  async verifyToken(token: string) {
    const refreshToken = await this.repository.findOneBy({ token });
    if (refreshToken) throw new UnauthorizedException('Token is banned');

    try {
      return this.jwtService.verify(token);
    } catch (error) {
      throw new UnauthorizedException('token expired');
    }
  }

  async login(user: Partial<User>): Promise<SingIn> {
    const payload = { email: user.email, id: user.id };

    console.log('payload', payload);

    return {
      user_id: user.id,
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload, { expiresIn: '12h' }),
      expires_in: 3600,
      refresh_token: this.jwtService.sign({ ...payload, refresh: true }, { expiresIn: '7d' }),
    };
  }

  async generateTokens(user: Partial<User>): Promise<AuthTokens> {
    const payload = { email: user.email, id: user.id };

    return {
      token_type: 'Bearer',
      access_token: this.jwtService.sign(payload, { expiresIn: '12h' }),
      expires_in: 3600,
      refresh_token: this.jwtService.sign({ ...payload, refresh: true }, { expiresIn: '7d' }),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { CreateAuth1Input } from './dto/create-auth1.input';
import { UpdateAuth1Input } from './dto/update-auth1.input';
import { UserService } from 'src/user/user.service';
import { SingInInput } from './dto/sign-in.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entities/user.entity';
import { SingIn } from './entities/sign-in.entity';

@Injectable()
export class Auth1Service {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (user && (await bcrypt.compare(password, user.password)))
      return await this.login(user);

    return null;
  }

  async login(user: Partial<User>): Promise<SingIn> {
    const payload = { email: user.email, id: user.id };

    return {
      user_id: user.id,
      access_token: this.jwtService.sign(payload),
    };
  }
}

import { Injectable } from '@nestjs/common';
import { SingInInput } from './dto/sing-in.input';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SingInService {
  constructor(private readonly userService: UserService) {}

  async create(input: SingInInput) {
    const user = await this.userService.findOneByEmail(input.email);

    if (!user) return null;
    return await bcrypt.compare(input.password, user.password);
  }
}

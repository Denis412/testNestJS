import { Injectable } from '@nestjs/common';
import { SingUpInput } from './dto/sing-up.input';
import { InjectRepository } from '@nestjs/typeorm';
import { SingUp } from './entities/sing-up.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SingUpService {
  constructor(
    @InjectRepository(SingUp) private readonly repository: Repository<SingUp>,
  ) {}

  create(input: SingUpInput) {
    return 'This action adds a new singUp';
  }
}

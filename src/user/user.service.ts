import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepos: Repository<User>,
  ) {}

  create(userData: CreateDto) {
    this.userRepos.insert(userData);
  }

  findOne(email: string) {
    return this.userRepos.findOne({ email });
  }
}

import { UpdateDto } from './dto/update.dto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepos: Repository<User>,
  ) { }

  async create(userData: CreateDto) {
    await this.userRepos.insert(userData);
  }

  findOne(email: string) {
    return this.userRepos.findOne({ email });
  }

  async get(id: string) {
    const user = await this.userRepos.findOne({ id });
    const { password, ...userWithoutId } = user;

    return userWithoutId;
  }

  async update(id: string, updateData: UpdateDto) {
    if (updateData.email && (await this.userRepos.findOne({ email: updateData.email }))) {
      throw new NotAcceptableException("Email already exist");
    }
    else {
      await this.userRepos.update(id, updateData);
      
      return this.userRepos.findOne({ id });
    }
  }
}

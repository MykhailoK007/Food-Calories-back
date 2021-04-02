import { UserDto } from './dto/user.dto';
import { UpdateDto } from './dto/update.dto';
import { Injectable, NotAcceptableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { InsertResult, Repository } from 'typeorm';
import { CreateDto } from './dto/create.dto';

@Injectable()
export class UserService {








  
  constructor(
    @InjectRepository(User)
    private userRepos: Repository<User>,
  ) {}

  create(userData: CreateDto): Promise<InsertResult> {
    return this.userRepos.insert(userData);
  }

  findOne(email: string): Promise<UserDto> {
    return this.userRepos.findOne({ email });
  }

  async get(id: string): Promise<Partial<UserDto>> {
    const user = await this.userRepos.findOne({ id });
    const { password, ...userWithoutId } = user;

    return userWithoutId;
  }

  async update(id: string, updateData: UpdateDto): Promise<UserDto> {
    if (
      updateData.email &&
      (await this.userRepos.findOne({ email: updateData.email }))
    ) {
      throw new NotAcceptableException('Email already exist');
    }
    await this.userRepos.update(id, updateData);

    return this.userRepos.findOne({ id });
  }
}

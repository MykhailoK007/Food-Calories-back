import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './../user/user.service';
import { Role } from 'src/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  getAccessToken(email: string, id: string, role: Role) {
    return {
      access_token: this.jwtService.sign({ email, id, role }),
    };
  }

  async signIn(logUser: LoginDto) {
    const user = await this.userService.findOne(logUser.email);

    if (await bcrypt.compare(logUser.password, user.password)) {
      return this.getAccessToken(user.email, user.id, user.role);
    }
    throw new UnauthorizedException();
  }

  async signUp(userData: SignUpDto) {
    userData.createdAt = new Date(Date.now());
    userData.password = bcrypt.hashSync(userData.password, Math.random());

    this.userService.create(userData);

    const newUser = await this.userService.findOne(userData.email);

    return this.getAccessToken(newUser.email, newUser.password, newUser.role);
  }
}

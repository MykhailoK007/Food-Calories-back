import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { UserService } from './../user/user.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) { }

    async validateUser(username: string, pass: string) {
        const user = await this.userService.findOne(username);

        if (bcrypt.compare(pass, user.password)) {
            const { password, ...result } = user;
            return result;
        }
        
        return null;
    }

    login(user: LoginDto) {
        const payload = { username: user.username, sub: user.id };

        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async signUp(userData: SignUpDto): Promise<LoginDto> {
        userData.createdAt = await new Date(Date.now());
        userData.password = await bcrypt.hash(userData.password, Math.random());

        await this.userService.create(userData);
        
        const newUser = await this.userService.findOne(userData.username);

        return { username: newUser.username, id: newUser.id }
    }
}

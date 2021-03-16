import { Controller, Request, Post, UseGuards, Get, Body } from '@nestjs/common';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local.guard';
import { Public } from 'src/decorators/noAuth.decorator';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }
    @Public()
    @UseGuards(LocalAuthGuard)
    @Post('signIn')
    signIn(@Request() req) {
        return this.authService.login(req.user);
    }

    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @Public()
    @Post('signUp')
    async signUp(@Body() newUser: SignUpDto) {
        return this.authService.login(await this.authService.signUp(newUser));
    }
}
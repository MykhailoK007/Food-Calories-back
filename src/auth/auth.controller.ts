import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/noAuth.decorator';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signIn')
  signIn(@Body() user: LoginDto) {
    return this.authService.signIn(user);
  }

  @Public()
  @Post('signUp')
  async signUp(@Body() newUser: SignUpDto) {
    return this.authService.signUp(newUser);
  }
}

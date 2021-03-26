import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { IToken } from './../interfaces/token.interface';
import { Controller, Post, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signUp.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/noAuth.decorator';

@ApiTags('auth')
@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signIn')
  @ApiCreatedResponse({ description: 'User successfully authorized.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  signIn(@Body() user: LoginDto): Promise<IToken> {
    return this.authService.signIn(user);
  }

  @Public()
  @Post('signUp')
  @ApiCreatedResponse({ description: 'User has been successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request body.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  async signUp(@Body() newUser: SignUpDto): Promise<IToken> {
    return this.authService.signUp(newUser);
  }
}

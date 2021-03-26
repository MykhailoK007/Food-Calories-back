import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UpdateDto } from './dto/update.dto';
import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User data has been provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  getUserData(@Request() req): Promise<Partial<UserDto>> {
    return this.userService.get(req.user.id);
  }

  @Patch('update')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User data has been changed.' })
  @ApiBadRequestResponse({ description: 'Bad request body.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  updateUserData(@Request() req, @Body() updateUser: UpdateDto): Promise<UserDto> {
    return this.userService.update(req.user.id, updateUser);
  }
}

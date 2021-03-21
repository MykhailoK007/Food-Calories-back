import { UpdateDto } from './dto/update.dto';
import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto } from './dto/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getUserData(@Request() req): Promise<Partial<UserDto>> {
    return this.userService.get(req.user.id);
  }

  @Patch('update')
  updateUserData(@Request() req, @Body() updateUser: UpdateDto): Promise<UserDto> {
    return this.userService.update(req.user.id, updateUser);
  }
}

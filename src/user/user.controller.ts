import { UpdateDto } from './dto/update.dto';
import { Body, Controller, Get, Patch, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getUserData(@Request() req) {
    return this.userService.get(req.user.id);
  }

  @Patch('update')
  updateUserData(@Request() req, @Body() updateUser: UpdateDto) {
    return this.userService.update(req.user.id, updateUser);
  }
}

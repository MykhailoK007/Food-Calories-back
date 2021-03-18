import { UpdateDto } from './dto/update.dto';
import { Body, Controller, Get, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  getUserData(@Request() req) {
    return this.userService.get(req.user.id);
  }

  @Put('update')
  updateUserData(@Request() req, @Body() updateUser: Partial<UpdateDto>) {
    return this.userService.update(req.user.id, updateUser);
  }
}

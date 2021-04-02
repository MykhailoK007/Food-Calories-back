import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { PaginatedValuesDto } from 'src/dto/paginated-dishes.dto';
import { QueryMetaDto } from 'src/dto/query-meta.dto';
import { Blacklist } from 'src/entities/blacklist.entity';
import { BlacklistService } from './blacklist.service';

@Controller('blacklist')
export class BlacklistController {
  constructor(private readonly blacklistService: BlacklistService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Blacklist has been provided.' })
  @ApiBadRequestResponse({ description: 'Bad query metadata.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(
    @Req() { user: { id: userId } },
    @Query() meta: QueryMetaDto,
  ): Promise<PaginatedValuesDto<Blacklist>> {
    return this.blacklistService.findAll(userId, meta);
  }

  // @Post()
  @Post(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Dish has been added to blacklist.' })
  @ApiBadRequestResponse({ description: 'Bad dish id.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  add(
    @Param('id') dishId: string,
    @Req() { user: { id: userId } },
    // @Body() { dishId },
  ): Promise<void> {
    return this.blacklistService.add(userId, dishId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Dish has been removed from blacklist.' })
  @ApiBadRequestResponse({ description: 'Bad dish id.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  delete(
    @Param('id') dishId: string,
    @Req() { user: { id: userId } },
  ): Promise<void> {
    return this.blacklistService.delete(userId, dishId);
  }
}

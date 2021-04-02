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
  ApiTags,
} from '@nestjs/swagger';
import { PaginatedValuesDto } from 'src/dto/paginated-dishes.dto';
import { QueryMetaDto } from 'src/dto/query-meta.dto';
import { Wishlist } from 'src/entities/wishlist.entity';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
@ApiTags('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Wishlist has been provided.' })
  @ApiBadRequestResponse({ description: 'Bad query metadata.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(
    @Req() { user: { id: userId } },
    @Query() meta: QueryMetaDto,
  ): Promise<PaginatedValuesDto<Wishlist>> {
    return this.wishlistService.findAll(userId, meta);
  }

  // @Post()
  @Post(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Dish has been added to wishlist.' })
  @ApiBadRequestResponse({ description: 'Bad dish id.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  add(
    @Param('id') dishId: string,
    @Req() { user: { id: userId } },
    // @Body() { dishId },
  ): Promise<void> {
    return this.wishlistService.add(userId, dishId);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Dish has been removed from wishlist.' })
  @ApiBadRequestResponse({ description: 'Bad dish id.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  delete(
    @Param('id') dishId: string,
    @Req() { user: { id: userId } },
  ): Promise<void> {
    return this.wishlistService.delete(userId, dishId);
  }
}

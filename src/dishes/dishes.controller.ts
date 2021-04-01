import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PaginatedValuesDto } from '../dto/paginated-dishes.dto';
import { QueryMetaDto } from '../dto/query-meta.dto';
import { Dish } from '../entities/dish.entity';
import { IId } from 'src/interfaces/id.interface';

@Controller('dishes')
@ApiTags('dish')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Dish successfully created.' })
  @ApiBadRequestResponse({ description: 'Bad request body.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  create(
    @Req() { user: { id: userId } },
    @Body() createDishDto: CreateDishDto,
  ): Promise<IId> {
    return this.dishesService.create(createDishDto, userId);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Dishes data has been provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(
    @Req() { user: { id: userId } },
    @Query() meta: QueryMetaDto,
  ): Promise<PaginatedValuesDto<Dish>> {
    return this.dishesService.findAll(userId, meta);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Dish data has been changed.' })
  @ApiBadRequestResponse({ description: 'Bad id / request body.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  update(
    @Req() { user: { id: userId, role } },
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDto,
  ): Promise<Dish> {
    console.log('a', userId, role)
    return this.dishesService.update(id, userId, updateDishDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBearerAuth()
  @ApiNoContentResponse({ description: 'Dish has been deleted.' })
  @ApiBadRequestResponse({ description: 'Bad id.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  remove(
    @Req() { user: { id: userId, role } },
    @Param('id') id: string,
  ): Promise<void> {
    return this.dishesService.remove(id, userId);
  }
}

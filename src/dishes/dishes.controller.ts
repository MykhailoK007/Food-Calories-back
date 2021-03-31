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
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { DishesService } from './dishes.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Dish } from '../entities/dish.entity';
import { PaginatedValuesDto } from '../dto/paginated-dishes.dto';
import { IId } from 'src/interfaces/id.interface';
import { QueryMetaDto } from '../dto/pagination.dto';

@Controller('dishes')
export class DishesController {
  constructor(private readonly dishesService: DishesService) {}

  @Post()
  create(@Req() req, @Body() createDishDto: CreateDishDto): Promise<IId> {
    return this.dishesService.create(createDishDto, req.user.id);
  }

  @Get()
  findAll(
    @Req() req,
    @Query() meta: QueryMetaDto,
  ): Promise<PaginatedValuesDto<Dish>> {
    return this.dishesService.findAll(req.user.id, meta);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.dishesService.findOne(id);
  // }

  @Patch(':id')
  update(
    @Req() req,
    @Param('id') id: string,
    @Body() updateDishDto: UpdateDishDto,
  ): Promise<Dish> {
    return this.dishesService.update(id, req.user.id, updateDishDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(
    @Req() { user: { id: userId }},
    @Param('id') id: string,
  ): Promise<void> {
    return this.dishesService.remove(id, userId);
  }
}

import { IId } from './interfaces/id.inteface';
import { IPagination } from './interfaces/pagination.interface';
import { UpdateIngredientDto } from './dto/update.dto';
import { CreateIngredientDto } from './dto/create.dto';
import { IngredientService } from './ingredient.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { PaginatedProductsResultDto } from './dto/paginationResult.dto';

@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) { }

  @Get()
  findAll(@Request() req, @Query() paginationData: IPagination): Promise<PaginatedProductsResultDto> {
    return this.ingredientService.findAll(paginationData, req.user.id);
  }

  @Post('add')
  createIngredient(@Request() req, @Body() newIngredient: CreateIngredientDto): Promise<IId> {
    return this.ingredientService.create(newIngredient, req.user.id);
  }

  @Patch('update/:id')
  updateIngredient(@Request() req, @Param('id') id: string, @Body() updateIngredient: UpdateIngredientDto): Promise<IIngridient> {
    return this.ingredientService.update(id, updateIngredient, req.user.id);
  }

  @Delete('delete/:id')
  deleteIngredient(@Request() req, @Param('id') id: string): Promise<void> {
    return this.ingredientService.delete(id, req.user.id);
  }
}

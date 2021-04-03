import { IId } from './interfaces/id.inteface';
import { UpdateIngredientDto } from './dto/update.dto';
import { CreateIngredientDto } from './dto/create.dto';
import { IngredientService } from './ingredient.service';
import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { PaginatedProductsResultDto } from './dto/paginationResult.dto';
import { PaginationDto } from './dto/pagination.dto';
import { ApiBadRequestResponse, ApiBearerAuth, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';

@ApiTags('ingredient')
@Controller('ingredient')
export class IngredientController {
  constructor(private readonly ingredientService: IngredientService) { }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'User data has been provided.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  findAll(@Request() req, @Query() paginationData: PaginationDto): Promise<PaginatedProductsResultDto> {
    return this.ingredientService.findAll(paginationData, req.user.id);
  }

  @Post('add')
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Ingredient successfully added.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  createIngredient(@Request() req, @Body() newIngredient: CreateIngredientDto): Promise<IId> {
    return this.ingredientService.create(newIngredient, req.user.id);
  }

  @Patch('update/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Ingredient data has been changed.' })
  @ApiBadRequestResponse({ description: 'Bad request id or query id' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  updateIngredient(@Request() req, @Param('id') id: string, @Body() updateIngredient: UpdateIngredientDto): Promise<IIngridient> {
    return this.ingredientService.update(id, updateIngredient, req.user.id);
  }

  @Delete('delete/:id')
  @ApiBearerAuth()
  @ApiOkResponse({ description: 'Ingredient has been deleted.' })
  @ApiBadRequestResponse({ description: 'Bad request id or query id.' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized.' })
  deleteIngredient(@Request() req, @Param('id') id: string): Promise<void> {
    return this.ingredientService.delete(id, req.user.id);
  }
}

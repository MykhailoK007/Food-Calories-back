import { PartialType } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';
import { CreateDishDto } from './create-dish.dto';
import { IngredientInfoDto } from './ingredient-info.dto';

export class UpdateDishDto extends PartialType(CreateDishDto) {
  @IsOptional()
  @IsArray()
  ingredientInfos: IngredientInfoDto[];

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;
}

import { Type } from 'class-transformer';
import { IsString, ValidateNested } from 'class-validator';
import { IngredientInfoDto } from './ingredient-info.dto';

export class CreateDishDto {
  @ValidateNested({ each: true })
  @Type(() => IngredientInfoDto)
  ingredientInfos: IngredientInfoDto[];

  @IsString()
  name: string;

  @IsString()
  description: string;
}

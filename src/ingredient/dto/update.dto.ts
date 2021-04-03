import { IsNumber, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateIngredientDto {

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsNumber()
  caloriesPer1g: number;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsUrl()
  picture: string;

}

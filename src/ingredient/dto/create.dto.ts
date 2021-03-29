import { IsNumber, IsString } from 'class-validator';

export class CreateIngredientDto {

  @IsString()
  name: string;

  @IsNumber()
  caloriesPer1g: number;

  created_at: Date;

  created_by: string;
}

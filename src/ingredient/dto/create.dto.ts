import { IsNumber, IsString } from 'class-validator';

export class CreateIngredientDto {

  @IsString()
  name: string;

  @IsNumber()
  calories_per_1g: number;

  created_at: Date;

  created_by: string;
}

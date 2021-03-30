import { IsArray, IsString } from "class-validator";
import { IngredientInfoDto } from "./ingredient-info.dto";

export class CreateDishDto {
    @IsArray()
    ingredientInfos: IngredientInfoDto[];

    @IsString()
    name: string;

    @IsString()
    description: string;

    createdAt: Date;
    calories: number;
}

import { IsArray, IsNumber, IsString, IsUUID } from "class-validator";

export class IngredientInfoDto {
    @IsUUID()
    id: string;

    @IsNumber()
    weight: number;
}

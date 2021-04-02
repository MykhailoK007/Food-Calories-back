import { IsUUID } from "class-validator";

export class AddToBlacklistDto {
    @IsUUID()
    dishId: string;
}
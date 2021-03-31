import { IsEnum, IsNumber, Min } from 'class-validator';

export enum SortingParams {
  Calories = 'calories',
  Wishlisted = 'wishlist',
}

export class QueryMetaDto {
  @IsNumber()
  @Min(1)
  offset: number;

  @IsNumber()
  @Min(1)
  limit: number;

  @IsEnum(SortingParams)
  sort: SortingParams;
}

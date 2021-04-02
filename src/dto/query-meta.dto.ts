import { Type } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';

export enum SortingParams {
  Calories = 'calories',
  Wishlisted = 'wishlist',
  CreatedAt = 'createdAt',
}

export class QueryMetaDto {
  @IsOptional()
  @Type(type => Number)
  @IsNumber()
  @Min(0)
  offset: number;

  @IsOptional()
  @Type(type => Number)
  @IsNumber()
  @Min(1)
  limit: number;

  @IsOptional()
  @IsEnum(SortingParams)
  sort: SortingParams;
}

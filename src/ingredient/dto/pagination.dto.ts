import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsString()
  page?: string;

  @IsOptional()
  @IsString()
  ownIng?: string;

  @IsOptional()
  @IsString()
  sortByDate?: string;

  @Expose()
  get validLimit(): number {
    const limit = !this.limit ? 25 : Number(this.limit);

    return limit;
  }

  @Expose()
  get validOffset(): number {
    const page = !this.page ? 1 : Number(this.page);

    return (page - 1) * this.validLimit;
  }

  @Expose()
  get sortBy(): string {
    const sortBy = this.sortByDate === 'true' ? 'Ingredient.createdAt' : 'Ingredient.caloriesPer1g';

    return sortBy;
  }

  @Expose()
  ownOrall(ownerId: string): string {
    const ownOrall = this.ownIng === 'true' ? `Ingredient.createdBy = '${ownerId}'` : 'true';

    return ownOrall;
  }
}

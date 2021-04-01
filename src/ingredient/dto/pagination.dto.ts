import { Expose } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
import enums from '../../helpers/enums';

export class PaginationDto {
  @IsOptional()
  @IsString()
  limit?: string;

  @IsOptional()
  @IsString()
  offset?: string;

  @IsOptional()
  @IsString()
  ownIng?: string;

  @IsOptional()
  @IsString()
  sort?: string;

  @Expose()
  get validLimit(): number {
    const limit = !this.limit ? 25 : Number(this.limit);

    return limit;
  }

  @Expose()
  get validOffset(): number {
    const offset = !this.offset ? 0 : Number(this.offset);

    return offset;
  }

  @Expose()
  get sortBy(): string {
    const queryPrefix = 'Ingredient.';
    const defaultSort = 'caloriesPer1g';
    if ((Object).values(enums.ingredients).includes(this.sort)) {
      return queryPrefix + this.sort;
    } else {
      return queryPrefix + defaultSort;
    }
  }

  @Expose()
  ownOrall(ownerId: string): string {
    const ownOrall = this.ownIng === 'true' ? `Ingredient.createdBy = '${ownerId}'` : 'true';

    return ownOrall;
  }
}

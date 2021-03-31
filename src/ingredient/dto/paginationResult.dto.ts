import { Ingredient } from './../../entities/ingredient.entity';

export class PaginatedProductsResultDto {
  data: Ingredient[];
  metaData: {
    page: number;
    limit: number;
    totalCount: number;
  };
}

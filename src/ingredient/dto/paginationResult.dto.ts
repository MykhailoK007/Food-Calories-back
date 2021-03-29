import { Ingredient } from './../../entities/ingredient.entity';

export class PaginatedProductsResultDto {
  data: Ingredient[];
  page: number;
  limit: number;
  totalCount: number;
}

import { Dish } from "src/entities/dish.entity";

export class PaginatedDishesDto {
  dishes: Dish[];
  page: number;
  limit: number;
  totalCount: number;
}
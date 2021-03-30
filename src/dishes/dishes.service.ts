import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from 'src/entities/dish.entity';
import { Ingredient } from 'src/entities/ingredient.entity';
import { IngredientsDishes } from 'src/entities/ingredients-dishes.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { PaginatedDishesDto } from './dto/paginated-dishes.dto';
import { UpdateDishDto } from './dto/update-dish.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
    @InjectRepository(IngredientsDishes)
    private ingrDishRepository: Repository<IngredientsDishes>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>) { }

  async create(createDishDto: CreateDishDto) {
    const ingrIds = createDishDto.ingredientInfos.map(info => info.id)
    const ingrWeights = createDishDto.ingredientInfos.map(info => info.weight)

    const ingredients = await this.ingredientRepository.findByIds(ingrIds);
    const ingrCalories = ingredients.map(ingr => ingr.caloriesPer1g);

    const calories = ingrCalories.reduce((prev, curr, i) => {
      return prev + (curr * ingrWeights[i]);
    })

    createDishDto.createdAt = new Date(Date.now());
    createDishDto.calories = calories;

    const dish = this.dishRepository.create(createDishDto);

    const ingrDishes = ingrIds.map((id, i) => {
      return {
        ingredientId: id,
        dishId: dish.id,
        weight: ingrWeights[i],
        calories: ingrCalories[i] * ingrWeights[i],
      }
    });

    this.ingrDishRepository.create(ingrDishes);
  }

  async findAll(page: number, limit: number, ownerId: string): Promise<PaginatedDishesDto> {
    page = page || 1;
    limit = limit || 25;

    const skippedItems = (page - 1) * limit;
    const totalCount = await this.dishRepository.count();
    const dishes: Dish[] = await this.dishRepository
      .createQueryBuilder()
      .where(`created_by = '${ownerId}'`)
      .offset(skippedItems)
      .limit(limit)
      .getMany();

    return {
      totalCount,
      page,
      limit,
      dishes
    }
  }

  async update(id: string, authorId: string, updateDishDto: UpdateDishDto) {
    if (await this.dishRepository.findOne({ id, author: authorId })) {
      this.dishRepository.update(id, updateDishDto);
    }
  }

  async remove(id: string, authorId: string) {
    if (await this.dishRepository.findOne({ id, author: authorId })) {
      this.dishRepository.delete(id);
    }
  }
}

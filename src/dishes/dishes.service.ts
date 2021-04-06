import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from 'src/entities/dish.entity';
import { Ingredient } from 'src/entities/ingredient.entity';
import { IngredientsDishes } from 'src/entities/ingredients-dishes.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PaginatedValuesDto } from '../dto/paginated-dishes.dto';
import { IId } from '../interfaces/id.interface';
import { QueryMetaDto, SortingParams } from '../dto/query-meta.dto';

@Injectable()
export class DishesService {
  constructor(
    @InjectRepository(Dish)
    private dishRepository: Repository<Dish>,
    @InjectRepository(IngredientsDishes)
    private ingrDishRepository: Repository<IngredientsDishes>,
    @InjectRepository(Ingredient)
    private ingredientRepository: Repository<Ingredient>,
  ) {}

  async create(createDishDto: CreateDishDto, author: string): Promise<IId> {
    const ingrIds = createDishDto.ingredientInfos.map(info => info.id);
    const ingredients = await this.ingredientRepository.findByIds(ingrIds);

    const weights = [];
    const calories = ingredients.map(({ id, caloriesPer1g }) => {
      const { weight } = createDishDto.ingredientInfos.find(
        ({ id: iId }) => iId === id,
      );
      weights.push(weight);
      return weight * caloriesPer1g;
    });

    const totalCalories = calories.reduce((prev, curr) => prev + curr, 0);

    const dish = this.dishRepository.create({
      ...createDishDto,
      author,
      calories: totalCalories,
    });

    const { id: dishId } = await this.dishRepository.save(dish);

    const ingrDishesLike = ingredients.map(({ id }, i) => {
      return {
        dishId,
        ingredientId: id,
        weight: weights[i],
        calories: calories[i],
      };
    });

    await this.ingrDishRepository.insert(ingrDishesLike);
    // const ingrDishes = this.ingrDishRepository.create(ingrDishesLike);
    // await this.ingrDishRepository.save(ingrDishes);

    return { id: dishId };
  }

  async findAll(
    author: string,
    { offset, limit, sort }: QueryMetaDto,
  ): Promise<PaginatedValuesDto<Dish>> {
    offset = offset || 0;
    limit = limit || 25;
    sort = sort || SortingParams.Calories;

    const [dishes, count]: [Dish[], number] = await this.dishRepository
      .createQueryBuilder('dish')
      .leftJoin('dish.blacklist', 'b')
      .innerJoinAndSelect('dish.ingredientsDishes', 'i_d')
      .innerJoinAndSelect('i_d.ingredient', 'i')
      .where('b."userId" != :author', { author })
      .orWhere('b."userId" ISNULL')
      .orderBy(`dish.${sort}`, 'ASC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();

    return {
      meta: {
        count,
        sort,
        offset,
        limit,
      },
      items: dishes,
    };
  }

  async update(
    id: string,
    author: string,
    updateDishDto: UpdateDishDto,
  ): Promise<Dish> {
    const foundDish = await this.dishRepository.findOne({ id, author });
    if (foundDish) {
      await this.dishRepository.update(id, updateDishDto);

      return this.dishRepository.findOne(id);
    } else {
      throw new BadRequestException(`No dish with id ${id} found`);
    }
  }

  async remove(id: string, author: string): Promise<void> {
    const foundDish = await this.dishRepository.findOne({ id, author });
    if (foundDish) {
      await this.dishRepository.delete(id);
    } else {
      throw new BadRequestException(`No dish with id ${id} found`);
    }
  }
}

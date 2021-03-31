import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from 'src/entities/dish.entity';
import { Ingredient } from 'src/entities/ingredient.entity';
import { IngredientsDishes } from 'src/entities/ingredients-dishes.entity';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { PaginatedValuesDto } from '../dto/paginated-dishes.dto';
import { IId } from '../../dist/interfaces/id.interface';
import { QueryMetaDto } from '../dto/pagination.dto';

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
    const ingrWeights = createDishDto.ingredientInfos.map(info => info.weight);

    const ingredients = await this.ingredientRepository.findByIds(ingrIds);
    const ingrCalories = ingredients.map(ingr => ingr.caloriesPer1g);

    const calories = ingredients.map(({ id, caloriesPer1g }) => {
      const { weight } = createDishDto.ingredientInfos.find(
        ({ id: iId }) => iId === id,
      );
      return calories.push(weight * caloriesPer1g);
    });

    const totalCalories = calories.reduce((prev, curr) => prev + curr, 0);

    const dish = this.dishRepository.create({
      ...createDishDto,
      author,
      calories: totalCalories,
    });
    const { id: dishId } = await this.dishRepository.save(dish);

    const ingrDishesLike = ingrIds.map((id, i) => {
      return {
        dishId,
        ingredientId: id,
        weight: ingrWeights[i],
        calories: ingrCalories[i] * ingrWeights[i],
      };
    });

    const ingrDishes = this.ingrDishRepository.create(ingrDishesLike);
    await this.ingrDishRepository.save(ingrDishes);

    return { id: dishId };
  }

  async findAll(
    author: string,
    { offset, limit, sort }: QueryMetaDto,
  ): Promise<PaginatedValuesDto<Dish>> {
    // const [dishes, count]: [Dish[], number] = await this.dishRepository
    //   .createQueryBuilder()
    //   .orderBy(sort, 'ASC')
    //   .where(`author = :author`, { author })
    //   .offset(offset)
    //   .limit(limit)
    //   .getManyAndCount();
    const [dishes, count]: [
      Dish[],
      number,
    ] = await this.dishRepository.findAndCount({
      where: {
        author,
      },
      skip: offset,
      take: limit,
      order: {
        [sort]: 'ASC',
      },
    });

    return {
      meta: {
        count,
        sort,
        offset,
        limit,
      },
      values: dishes,
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

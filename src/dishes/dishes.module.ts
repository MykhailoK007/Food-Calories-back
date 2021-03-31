import { Module } from '@nestjs/common';
import { DishesService } from './dishes.service';
import { DishesController } from './dishes.controller';
import { IngredientsDishes } from '../entities/ingredients-dishes.entity';
import { Ingredient } from 'src/entities/ingredient.entity';
import { Dish } from 'src/entities/dish.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([
    Dish, Ingredient, IngredientsDishes,
  ])],
  controllers: [DishesController],
  providers: [DishesService],
})
export class DishesModule {}

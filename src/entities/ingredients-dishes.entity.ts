import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Ingredient } from './ingredient.entity';
import { Dish } from './dish.entity';

@Entity()
export class IngredientsDishes {
  @PrimaryColumn()
  ingredientId: string;

  @PrimaryColumn()
  dishId: string;

  @Column()
  weight: number;

  @Column()
  calories: number;

  @ManyToOne(
    type => Ingredient,
    ingredient => ingredient.ingredientsDishes,
  )
  ingredient: Ingredient;

  @ManyToOne(
    type => Dish,
    dish => dish.ingredientsDishes,
  )
  dish: Dish;
}

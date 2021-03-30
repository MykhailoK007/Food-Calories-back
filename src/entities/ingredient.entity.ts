import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IngredientsDishes } from './ingredients-dishes.entity';
import { MissingDishFB } from './missing-dish-fb.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  created_by: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  picture: string;

  @Column()
  calories_per_1g: number;

  @Column({ type: 'timestamp without time zone' })
  created_at: Date;

  @OneToMany(
    type => IngredientsDishes,
    ingredientsDishes => ingredientsDishes.ingredient,
  )
  ingredientsDishes: IngredientsDishes[];

  @ManyToMany(
    type => MissingDishFB,
    missingDishFbs => missingDishFbs.ingredients,
  )
  missingDishFbs: MissingDishFB[];
}

import {
  Column,
  Entity,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';
import { IngredientsDishes } from './ingredients-dishes.entity';
import { MissingDishFB } from './missing-dish-fb.entity';
import { User } from './user.entity';

@Entity()
export class Ingredient {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  picture: string;

  @Column()
  caloriesPer1g: number;

  @Column({ type: 'timestamp without time zone' })
  createdAt: Date;

  @Column()
  createdBy: string;

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

  @ManyToOne(
    type => User,
    user => user.ingredients,
  )
  user: User;
}

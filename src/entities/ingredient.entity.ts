import { Column, Entity, PrimaryColumn, OneToMany, ManyToMany, Generated } from 'typeorm';
import { IngredientsDishes } from './ingredients-dishes.entity';
import { MissingDishFB } from './missing-dish-fb.entity';

@Entity()
export class Ingredient {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  picture: string;

  @Column()
  caloriesPer1g: number;

  @Column()
  createdAt: Date;

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

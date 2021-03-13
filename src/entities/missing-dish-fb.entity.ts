import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Dish } from './dish.entity';
import { User } from './user.entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class MissingDishFB {
  @PrimaryColumn()
  userId: string;

  @Column()
  message: string;

  @Column()
  createdAt: Date;

  @ManyToMany(type => Ingredient)
  ingredients: Ingredient[];

  @ManyToOne(
    type => User,
    user => user.missingDishFBs,
  )
  user: User;
}

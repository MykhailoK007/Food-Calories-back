import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Ingredient } from './ingredient.entity';

@Entity()
export class MissingDishFB {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  message: string;

  @Column({ type: 'timestamp without time zone'})
  createdAt: Date;

  @ManyToMany(
    type => Ingredient,
    ingredient => ingredient.missingDishFbs,
  )
  @JoinTable({
    name: 'ingredients_missing_dish_fbs',
    joinColumn: {
      name: 'missing_dish_fb',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ingredient',
      referencedColumnName: 'id',
    },
  })
  ingredients: Ingredient[];

  @ManyToOne(
    type => User,
    user => user.missingDishFBs,
  )
  @JoinColumn({ name: 'userId' })
  user: User;
}

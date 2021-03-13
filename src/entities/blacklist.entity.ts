import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Dish } from './dish.entity';
import { User } from './user.entity';

@Entity()
export class Blacklist {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  dishId: string;

  @Column()
  createdAt: Date;

  @ManyToOne(
    type => User,
    user => user.blacklist,
  )
  user: User;

  @ManyToOne(
    type => Dish,
    dish => dish.blacklist,
  )
  dish: Dish;
}
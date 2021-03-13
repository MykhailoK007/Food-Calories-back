import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Dish } from './dish.entity';
import { User } from './user.entity';

@Entity()
export class Wishlist {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  dishId: string;

  @Column()
  createdAt: Date;

  @ManyToOne(
    type => User,
    user => user.wishlist,
  )
  user: User;

  @ManyToOne(
    type => Dish,
    dish => dish.wishlist,
  )
  dish: Dish;
}

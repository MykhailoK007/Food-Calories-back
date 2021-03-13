import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Dish } from './dish.entity';
import { User } from './user.entity';

@Entity()
export class Feedback {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  dishId: string;

  @Column()
  message: string;

  @Column()
  createdAt: Date;

  @Column({ nullable: true })
  deletedAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @ManyToOne(
    type => User,
    user => user.feedbacks,
  )
  user: User;

  @ManyToOne(
    type => Dish,
    dish => dish.feedbacks,
  )
  dish: Dish;
}

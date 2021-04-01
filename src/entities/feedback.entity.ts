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

  @Column({ type: 'timestamp without time zone'})
  createdAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  deletedAt: Date;

  @Column({ type: 'timestamp without time zone', nullable: true })
  updatedAt: Date;

  @ManyToOne(
    type => User,
    user => user.feedbacks,
    { onDelete: 'CASCADE' },
  )
  user: User;

  @ManyToOne(
    type => Dish,
    dish => dish.feedbacks,
    { onDelete: 'CASCADE' },
  )
  dish: Dish;
}

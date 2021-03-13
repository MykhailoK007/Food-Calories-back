import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IngredientsDishes } from './ingredients-dishes.entity';
import { Wishlist } from './wishlist.entity';
import { Blacklist } from './blacklist.entity';
import { Feedback } from './feedback.entity';

@Entity()
export class Dish {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  picture: string;

  @Column()
  calories: number;

  @Column()
  createdAt: Date;

  @OneToMany(
    type => IngredientsDishes,
    ingredientsDishes => ingredientsDishes.dish,
  )
  ingredientsDishes: IngredientsDishes[];

  @OneToMany(
    type => Wishlist,
    wishlist => wishlist.dish,
  )
  wishlist: Wishlist[];

  @OneToMany(
    type => Blacklist,
    blacklist => blacklist.dish,
  )
  blacklist: Blacklist[];

  @OneToMany(
    type => Feedback,
    feedback => feedback.dish,
  )
  feedbacks: Feedback[];
}

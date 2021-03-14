import { Column, Entity, Generated, OneToMany, OneToOne, PrimaryColumn } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Blacklist } from './blacklist.entity';
import { Feedback } from './feedback.entity';
import { MissingDishFB } from './missing-dish-fb.entity';

@Entity()
export class User {
  @PrimaryColumn()
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  picture: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column()
  createdAt: Date;

  @OneToMany(
    type => Wishlist,
    wishlist => wishlist.user,
  )
  wishlist: Wishlist[];

  @OneToMany(
    type => Blacklist,
    blacklist => blacklist.user,
  )
  blacklist: Blacklist[];

  @OneToMany(
    type => Feedback,
    feedback => feedback.user,
  )
  feedbacks: Feedback[];

  @OneToMany(
    type => MissingDishFB,
    feedback => feedback.user,
  )
  missingDishFBs: MissingDishFB[];
}

import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Wishlist } from './wishlist.entity';
import { Blacklist } from './blacklist.entity';
import { Feedback } from './feedback.entity';
import { MissingDishFB } from './missing-dish-fb.entity';

export enum Role {
  User = 'user',
  Admin = 'admin',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  role: Role;

  @Column()
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

  @Column({ type: 'timestamp without time zone' })
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

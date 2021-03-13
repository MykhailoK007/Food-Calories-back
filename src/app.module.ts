import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './entities/user.entity';
import { Ingredient } from './entities/ingredient.entity';
import { Dish } from './entities/dish.entity';
import { IngredientsDishes } from './entities/ingredients-dishes.entity';
import { Wishlist } from './entities/wishlist.entity';
import { Blacklist } from './entities/blacklist.entity';
import { Feedback } from './entities/feedback.entity';
import { MissingDishFB } from './entities/missing-dish-fb.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',
      database: 'food_calories',
      entities: [
        User,
        Ingredient,
        Dish,
        IngredientsDishes,
        Wishlist,
        Blacklist,
        Feedback,
        MissingDishFB,
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

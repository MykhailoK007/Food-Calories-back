import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
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
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '',//set your password here
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
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtGuard,
    },
  ],
})
export class AppModule { }

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { IngredientModule } from 'src/ingredient/ingredient.module';
import { DishesModule } from './dishes/dishes.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    IngredientModule,
    TypeOrmModule.forRoot(),
    DishesModule,
    BlacklistModule,
    WishlistModule,
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

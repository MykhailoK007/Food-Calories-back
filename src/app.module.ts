import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtGuard } from './auth/guards/jwt.guard';
import { DishesModule } from './dishes/dishes.module';
import { BlacklistModule } from './blacklist/blacklist.module';
import { WhitelistModule } from './whitelist/whitelist.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    TypeOrmModule.forRoot(),
    DishesModule,
    BlacklistModule,
    WhitelistModule,
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

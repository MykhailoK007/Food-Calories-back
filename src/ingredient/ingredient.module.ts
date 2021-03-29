import { IngredientService } from './ingredient.service';
import { Ingredient } from '../entities/ingredient.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientController } from './ingredient.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Ingredient])],
  providers: [IngredientService],
  controllers: [IngredientController],
  exports: [],
})
export class IngredientModule { }

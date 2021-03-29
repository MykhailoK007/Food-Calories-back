import { Ingredient } from './../entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateIngredientDto } from './dto/update.dto';
import { PaginatedProductsResultDto } from './dto/paginationResult.dto';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepos: Repository<Ingredient>,
  ) { }

  async findAll(page: number, limit: number, ownerId: string): Promise<PaginatedProductsResultDto> {
    if (!page) {
      page = 1;
    }
    if (!limit) {
      limit = 25;
    }

    const skippedItems = (page - 1) * limit;
    const totalCount = await this.ingredientRepos.count({ created_by: ownerId });
    const products: Ingredient[] = await this.ingredientRepos
      .createQueryBuilder()
      .where(`created_by = '${ownerId}'`)
      .offset(skippedItems)
      .limit(limit)
      .getMany();

    return {
      // return this data for frontend
      totalCount,
      limit,
      page,
      data: products,
    };
  }

  create(ingredientData: CreateIngredientDto, ownerId: string): void {
    ingredientData.created_at = new Date(Date.now());
    ingredientData.created_by = ownerId;
    this.ingredientRepos.save(ingredientData);
  }

  async update(id: string, ingredientData: UpdateIngredientDto, ownerId: string): Promise<void> {
    if (await this.ingredientRepos.findOne({ created_by: ownerId, id })) {
      this.ingredientRepos.update(id, ingredientData);
    } else {
      throw new BadRequestException(`Can't update`);
    }
  }

  async delete(id: string, ownerId: string): Promise<void> {
    if (await this.ingredientRepos.findOne({ created_by: ownerId, id })) {
      await this.ingredientRepos.delete(id);
    } else {
      throw new BadRequestException(`Can't delete`);
    }
  }
}

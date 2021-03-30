import { IPagination } from './interfaces/pagination.interface';
import { Ingredient } from './../entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateIngredientDto } from './dto/update.dto';
import { PaginatedProductsResultDto } from './dto/paginationResult.dto';
import { IId } from './interfaces/id.inteface';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepos: Repository<Ingredient>,
  ) { }

  async findAll(metaData: IPagination, ownerId: string): Promise<PaginatedProductsResultDto> {
    const page = !metaData.page ? 1 : Number(metaData.page);
    const limit = !metaData.limit ? 25 : Number(metaData.limit);
    const sortBy = metaData.sortByDate === 'true' ? 'created_at' : 'calories_per_1g';
    const ownOrall = metaData.ownIng === 'true' ? `created_by = '${ownerId}'` : 'true';
    const skippedItems = (page - 1) * limit;
    const totalCount = ownOrall === 'true' ? await this.ingredientRepos.count() : await this.ingredientRepos.count({ created_by: ownerId });

    const products: Ingredient[] = await this.ingredientRepos
      .createQueryBuilder()
      .orderBy(`${sortBy}`, 'ASC')
      .where(ownOrall)
      .offset(skippedItems)
      .limit(limit)
      .getMany();

    return {
      data: products,
      metaData: {
        totalCount,
        limit,
        page
      }
    };
  }

  async create(ingredientData: CreateIngredientDto, ownerId: string): Promise<IId> {
    ingredientData.created_at = new Date(Date.now());
    ingredientData.created_by = ownerId;
    return { id: (await this.ingredientRepos.save(ingredientData)).id };
  }

  async update(id: string, ingredientData: UpdateIngredientDto, ownerId: string): Promise<IIngridient> {
    if (await this.ingredientRepos.findOne({ created_by: ownerId, id })) {
      this.ingredientRepos.update(id, ingredientData);
      return this.ingredientRepos.findOne(id);
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

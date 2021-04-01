import { Ingredient } from './../entities/ingredient.entity';
import { CreateIngredientDto } from './dto/create.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateIngredientDto } from './dto/update.dto';
import { PaginatedProductsResultDto } from './dto/paginationResult.dto';
import { IId } from './interfaces/id.inteface';
import { PaginationDto } from './dto/pagination.dto';
import { plainToClass } from 'class-transformer';

@Injectable()
export class IngredientService {
  constructor(
    @InjectRepository(Ingredient)
    private ingredientRepos: Repository<Ingredient>,
  ) { }

  async findAll(paginationData: PaginationDto, ownerId: string): Promise<PaginatedProductsResultDto> {
    const metaData = plainToClass(PaginationDto, paginationData);
    const { validLimit: limit, validOffset: offSet, sortBy } = metaData;
    const ownOrall = metaData.ownOrall(ownerId);
    const totalCount = ownOrall === 'true' ?
      await this.ingredientRepos.count() :
      await this.ingredientRepos.count({ createdBy: ownerId });

    const products: Ingredient[] = await this.ingredientRepos
      .createQueryBuilder()
      .orderBy(sortBy, 'ASC')
      .where(ownOrall)
      .offset(offSet)
      .limit(limit)
      .getMany();

    return {
      data: products,
      metaData: {
        totalCount,
        limit,
        offSet,
      },
    };
  }

  async create(ingredientData: CreateIngredientDto, ownerId: string): Promise<IId> {
    ingredientData.createdAt = new Date(Date.now());
    ingredientData.createdBy = ownerId;

    const newIngredient = await this.ingredientRepos.save(ingredientData);

    return { id: newIngredient.id };
  }

  async update(id: string, ingredientData: UpdateIngredientDto, ownerId: string): Promise<IIngridient> {
    const toUpdateIngredient = await this.ingredientRepos.findOne({ createdBy: ownerId, id });

    if (toUpdateIngredient) {
      this.ingredientRepos.update(id, ingredientData);

      return this.ingredientRepos.findOne(id);
    } else {
      throw new BadRequestException(`Can't update`);
    }
  }

  async delete(id: string, ownerId: string): Promise<void> {
    if (await this.ingredientRepos.findOne({ createdBy: ownerId, id })) {
      await this.ingredientRepos.delete(id);
    } else {
      throw new BadRequestException(`Can't delete`);
    }
  }
}

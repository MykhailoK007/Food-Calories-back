import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedValuesDto } from 'src/dto/paginated-dishes.dto';
import { QueryMetaDto, SortingParams } from 'src/dto/query-meta.dto';
import { Blacklist } from 'src/entities/blacklist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BlacklistService {
  constructor(
    @InjectRepository(Blacklist)
    private blRepository: Repository<Blacklist>,
  ) {}

  async findAll(
    userId: string,
    { offset = 0, limit = 25, sort = SortingParams.CreatedAt}: QueryMetaDto,
  ): Promise<PaginatedValuesDto<Blacklist>> {
    const [blacklist, count]: [Blacklist[], number] = await this.blRepository
      .createQueryBuilder('blacklist')
      .innerJoinAndSelect('blacklist.dish', 'd')
      .where('blacklist."userId" = :userId', { userId })
      .orderBy(`blacklist.${sort}`, 'ASC')
      .offset(offset)
      .limit(limit)
      .getManyAndCount();

    return {
      meta: {
        count,
        sort,
        offset,
        limit,
      },
      items: blacklist,
    };
  }

  async add(userId: string, dishId: string): Promise<void> {
    const foundBlacklisted = await this.blRepository.findOne({ dishId, userId });
    if (!foundBlacklisted) {
      const createdAt = new Date();
      await this.blRepository.insert({ dishId, userId, createdAt });
    } else {
      throw new BadRequestException('No such dish or dish is already blacklisted');
    }
  }

  async delete(userId: string, dishId: string): Promise<void> {
    const foundBlacklisted = await this.blRepository.findOne({ dishId, userId });
    if (foundBlacklisted) {
      await this.blRepository.delete({ dishId, userId });
    } else {
      throw new BadRequestException('No such dish in your blacklist');
    }
  }
}

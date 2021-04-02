import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginatedValuesDto } from 'src/dto/paginated-dishes.dto';
import { QueryMetaDto, SortingParams } from 'src/dto/query-meta.dto';
import { Wishlist } from 'src/entities/wishlist.entity';
import { Repository } from 'typeorm';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wlRepository: Repository<Wishlist>,
  ) {}

  async findAll(
    userId: string,
    { offset, limit, sort }: QueryMetaDto,
  ): Promise<PaginatedValuesDto<Wishlist>> {
    offset = offset || 0;
    limit = limit || 25;
    sort = sort || SortingParams.CreatedAt;

    const [wishlist, count]: [Wishlist[], number] = await this.wlRepository
      .createQueryBuilder('wishlist')
      .innerJoinAndSelect('wishlist.dish', 'd')
      .where('wishlist."userId" = :userId', { userId })
      .orderBy(`wishlist.${sort}`, 'ASC')
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
      items: wishlist,
    };
  }

  async add(userId: string, dishId: string): Promise<void> {
    const foundWishlisted = await this.wlRepository.findOne({ dishId, userId });
    if (!foundWishlisted) {
      const createdAt = new Date();
      await this.wlRepository.insert({ dishId, userId, createdAt });
    } else {
      throw new BadRequestException(
        'No such dish or dish is already wishlisted',
      );
    }
  }

  async delete(userId: string, dishId: string): Promise<void> {
    const foundWishlisted = await this.wlRepository.findOne({ dishId, userId });
    if (foundWishlisted) {
      await this.wlRepository.delete({ dishId, userId });
    } else {
      throw new BadRequestException('No such dish in your wishlist');
    }
  }
}

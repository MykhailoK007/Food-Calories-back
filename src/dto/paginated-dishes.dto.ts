import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { MetaDto } from './meta.dto';

export class PaginatedValuesDto<T> {
  @IsArray()
  items: T[];

  @ValidateNested()
  @Type(() => MetaDto)
  meta: MetaDto;
}

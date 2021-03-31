import { IsNumber, Min } from 'class-validator';
import { QueryMetaDto } from './pagination.dto';

export class MetaDto extends QueryMetaDto {
  @IsNumber()
  @Min(0)
  count: number;
}

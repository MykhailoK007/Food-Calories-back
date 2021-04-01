import { IsNumber, Min } from 'class-validator';
import { QueryMetaDto } from './query-meta.dto';

export class MetaDto extends QueryMetaDto {
  @IsNumber()
  @Min(0)
  count: number;
}

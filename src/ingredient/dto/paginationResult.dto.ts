export class PaginatedProductsResultDto {
  data: IIngridient[];
  metaData: {
    offSet: number;
    limit: number;
    totalCount: number;
  };
}

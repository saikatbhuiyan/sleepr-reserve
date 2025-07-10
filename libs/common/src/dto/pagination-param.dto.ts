import { IsNumber, IsOptional } from 'class-validator';

export class PaginationParams {
  @IsNumber()
  @IsOptional()
  page?: number = 1;

  @IsNumber()
  @IsOptional()
  limit?: number = 1;
}

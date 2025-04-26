/* eslint-disable @typescript-eslint/no-unsafe-return */
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  ValidateNested,
  IsEnum,
  IsBoolean,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

import {
  SORT_ORDER_MAPPING,
  SortOrder,
  SortOrderInput,
  FILTER_OPERATOR_MAPPING,
  FilterOperator,
  FilterOperatorInput,
} from '../constants';

export class PaginationRequestDto {
  @IsOptional()
  @IsNumber()
  page: number;

  @IsOptional()
  @IsNumber()
  limit: number;
}

export class SortDto {
  @IsNotEmpty()
  @IsString()
  field: string;

  @IsNotEmpty()
  @IsEnum(SortOrderInput)
  @Transform(({ value }) => {
    return SORT_ORDER_MAPPING[Number(value)] ?? undefined;
  })
  order: SortOrder;
}

export class FilterDto {
  @IsNotEmpty()
  @IsString()
  field: string;

  @IsNotEmpty()
  @IsEnum(FilterOperatorInput)
  @Transform(({ value }) => {
    return FILTER_OPERATOR_MAPPING[Number(value)] ?? undefined;
  })
  operator: FilterOperator;

  @IsOptional()
  @IsNumber()
  numberValue: number;

  @IsOptional()
  @IsString()
  stringValue: string;

  @IsOptional()
  @IsBoolean()
  booleanValue: boolean;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  numberValues: number[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  stringValues: string[];

  @IsOptional()
  @IsArray()
  @IsBoolean({ each: true })
  booleanValues: boolean[];
}

export class GetListRequestDto {
  @ValidateNested()
  @Type(() => PaginationRequestDto)
  pagination: PaginationRequestDto;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SortDto)
  sort: SortDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FilterDto)
  filter: FilterDto[];
}

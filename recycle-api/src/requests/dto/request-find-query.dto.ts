import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsBooleanString,
} from 'class-validator';
import { DEFAULT_PAGE, DEFAULT_PAGE_SIZE } from 'src/constants';
import { ParseOptionalBoolean } from 'src/common/validations/validations';

export class RequestFindQueryDto {
  constructor(data) {
    Object.assign(this, data);
  }
  @ApiProperty({
    required: false,
    default: DEFAULT_PAGE,
    description: 'Page num',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  page?: number;

  @ApiProperty({
    required: false,
    default: DEFAULT_PAGE_SIZE,
    description: 'Page size',
  })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  perPage?: number;

  @ApiProperty({ required: false })
  @ParseOptionalBoolean()
  @IsBooleanString()
  @IsOptional()
  is_active?: boolean;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  query?: string;
}

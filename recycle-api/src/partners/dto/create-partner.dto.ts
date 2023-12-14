import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsFile } from 'src/common/validations/validations';

export class CreatePartnerDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  website?: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  long: number;

  @ApiProperty()
  @IsString()
  contact_person: string;

  @ApiProperty()
  @IsString()
  contact_phone: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  inn: string;

  @ApiProperty({ type: Number, isArray: true })
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => Number)
  materials: number[];

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  is_active: boolean;
}

export class CreatePartnerWithFileDto extends CreatePartnerDto {
  constructor(data) {
    console.log(
      '🚀 ~ file: create-partner.dto.ts:70 ~ CreatePartnerWithFileDto ~ constructor ~ data:',
      data,
    );
    super(data);
    Object.assign(this, data);
  }
  @ApiProperty({ type: 'string', format: 'binary', required: false })
  @IsFile({ mime: ['image/png', 'image/jpg', 'image/jpeg'] })
  @IsOptional()
  image?: string;
}

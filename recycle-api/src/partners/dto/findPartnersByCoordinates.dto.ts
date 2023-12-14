import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export default class GetPartnerByCoordinatesDto {
  @ApiProperty()
  @IsString()
  northLat: string;

  @ApiProperty()
  @IsString()
  northLong: string;

  @ApiProperty()
  @IsString()
  southLat: string;

  @ApiProperty()
  @IsString()
  southLong: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  materials?: string[];
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateMaterialDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  color: string;

  @ApiProperty()
  @IsString()
  icon: string;
}

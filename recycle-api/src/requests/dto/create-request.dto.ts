import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateRequestDto {
  constructor(data) {
    Object.assign(this, data);
  }
  @ApiProperty()
  @IsString()
  inn: string;

  @ApiProperty()
  @IsString()
  contact_person: string;

  @ApiProperty()
  @IsString()
  contact_phone: string;
}

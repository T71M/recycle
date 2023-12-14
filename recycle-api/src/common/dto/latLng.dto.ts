import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export default class LatLngDto {
  constructor(data) {
    Object.assign(this, data);
  }
  @ApiProperty()
  @IsNumber()
  lat: number;

  @ApiProperty()
  @IsNumber()
  lng: number;
}

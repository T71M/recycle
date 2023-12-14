import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  constructor(data) {
    Object.assign(this, data);
  }
  @ApiProperty()
  name: string;
  @ApiProperty()
  north_lat: number;
  @ApiProperty()
  north_long: number;
  @ApiProperty()
  east_lat: number;
  @ApiProperty()
  east_long: number;
  @ApiProperty()
  center_lat: number;
  @ApiProperty()
  center_long: number;
}

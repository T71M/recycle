import { ApiProperty } from '@nestjs/swagger';
import { City as Entity } from '@prisma/client';

export class City implements Entity {
  @ApiProperty()
  id: number;
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

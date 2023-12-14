import { ApiProperty } from '@nestjs/swagger';
import { City } from '../entities/city.entity';

export default class IsAllowedCityResponseDto {
  @ApiProperty({ type: City, required: false })
  allowedCity: City;

  @ApiProperty({ type: String, required: false })
  city: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { City } from '../entities/city.entity';

export default class FindCitiesResponseDto {
  @ApiProperty({ type: City, isArray: true })
  cities: City[];
}

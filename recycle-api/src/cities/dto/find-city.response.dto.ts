import { ApiProperty } from '@nestjs/swagger';
import AddressResponseDto from './address.dto';

export default class FindCityResponseDto {
  @ApiProperty()
  place_id: number;

  @ApiProperty()
  licence: string;

  @ApiProperty()
  lat: string;

  @ApiProperty()
  lon: string;

  @ApiProperty()
  addresstype: string;

  @ApiProperty()
  display_name: string;

  @ApiProperty()
  address: AddressResponseDto;
}

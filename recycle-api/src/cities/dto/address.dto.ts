import { ApiProperty } from '@nestjs/swagger';

export default class AddressResponseDto {
  @ApiProperty()
  house_number: string;
  @ApiProperty()
  road: string;
  @ApiProperty()
  borough: string;
  @ApiProperty()
  city: string;
  @ApiProperty()
  municipality: string;
  @ApiProperty()
  state: string;
  @ApiProperty()
  postcode: string;
  @ApiProperty()
  country: string;
  @ApiProperty()
  string: string;
  @ApiProperty()
  country_code: string;
}

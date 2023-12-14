import { ApiProperty } from '@nestjs/swagger';
import { Partner as PartnerEntity } from '@prisma/client';

export class Partner implements PartnerEntity {
  @ApiProperty()
  id: number;

  @ApiProperty({ required: false })
  image: string;

  @ApiProperty({ required: false })
  website: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  lat: number;

  @ApiProperty()
  long: number;

  @ApiProperty()
  contact_person: string;

  @ApiProperty()
  contact_phone: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  inn: string;

  @ApiProperty()
  is_active: boolean;
}

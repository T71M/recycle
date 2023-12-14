import { ApiProperty } from '@nestjs/swagger';
import { Request as RequestEntity } from '@prisma/client';
export class Request implements RequestEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  inn: string;

  @ApiProperty()
  contact_person: string;
  @ApiProperty()
  contact_phone: string;

  @ApiProperty()
  is_active: boolean;

  @ApiProperty()
  is_accept: boolean;
}

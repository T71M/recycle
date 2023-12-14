import { ApiProperty } from '@nestjs/swagger';
import { Material as MaterialEntity } from '@prisma/client';

export class Material implements MaterialEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  color: string;

  @ApiProperty()
  icon: string;
}

import { ApiProperty } from '@nestjs/swagger';

export class MetaDto {
  @ApiProperty({
    required: true,
  })
  total!: number;
  @ApiProperty({
    required: true,
  })
  lastPage!: number;
  @ApiProperty({
    required: true,
  })
  currentPage!: number;
  @ApiProperty({
    required: true,
  })
  perPage!: number;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  prev?: number;
  @ApiProperty({
    required: false,
    nullable: true,
  })
  next?: number;
}

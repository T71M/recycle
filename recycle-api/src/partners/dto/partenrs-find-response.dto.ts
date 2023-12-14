import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from 'src/common/dto/meta.dto';
import { Partner } from '../entities/partner.entity';

export class PartnersFindResponseDto {
  @ApiProperty({
    required: true,
    type: Partner,
    isArray: true,
  })
  data: Partner[];

  @ApiProperty({ required: true, type: MetaDto })
  meta: MetaDto;
}

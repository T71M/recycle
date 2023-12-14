import { ApiProperty } from '@nestjs/swagger';
import { Partner } from '../entities/partner.entity';

export default class PartnerResponseDto {
  @ApiProperty({ type: Partner })
  partner: Partner;
}

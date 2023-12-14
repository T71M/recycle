import { PartialType } from '@nestjs/swagger';
import {
  CreatePartnerDto,
  CreatePartnerWithFileDto,
} from './create-partner.dto';

export class UpdatePartnerWithFileDto extends PartialType(
  CreatePartnerWithFileDto,
) {
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }
}

export class UpdatePartnerDto extends PartialType(CreatePartnerDto) {
  constructor(data) {
    super(data);
    Object.assign(this, data);
  }
}

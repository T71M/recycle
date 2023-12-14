import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber } from 'class-validator';
import { ParseOptionalBoolean } from 'src/common/validations/validations';

export default class UpdateRequestStatusDto {
  constructor(data) {
    Object.assign(this, data);
  }

  @ApiProperty({})
  @ParseOptionalBoolean()
  @IsBoolean()
  status: boolean;

  @IsNumber()
  id: number;
}

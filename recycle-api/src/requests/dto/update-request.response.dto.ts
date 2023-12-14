import { ApiProperty } from '@nestjs/swagger';
import { Request } from '../entities/request.entity';

export default class UpdateRequestResponseDto {
  @ApiProperty({ type: Request })
  request: Request;
}

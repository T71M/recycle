import { ApiProperty } from '@nestjs/swagger';
import { MetaDto } from 'src/common/dto/meta.dto';
import { Request } from '../entities/request.entity';

export default class RequestFindResponseDto {
  @ApiProperty({
    required: true,
    type: Request,
    isArray: true,
  })
  data: Request[];

  @ApiProperty({ required: true, type: MetaDto })
  meta: MetaDto;
}

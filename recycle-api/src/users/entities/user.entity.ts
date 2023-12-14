import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export default class UserEntity implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  password: string;

  @ApiProperty()
  email: string;
}

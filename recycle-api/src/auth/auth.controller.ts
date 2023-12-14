import { Controller } from '@nestjs/common';
import { Body, Get, Post, Request, UseGuards } from '@nestjs/common/decorators';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '@prisma/client';
import { LoginUserDto } from './dto/login-user.dto';
import UserEntity from 'src/users/entities/user.entity';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@ApiTags('auth')
@Controller('auth')
@ApiBearerAuth()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  @ApiBody({
    type: LoginUserDto,
    examples: {
      test: {
        summary: 'Login',
        value: { email: 'admin@mail.com', password: 'admin' } as LoginUserDto,
      },
    },
  })
  async login(@Request() request) {
    return await this.authService.login(request.user as User);
  }

  @Post('register')
  async register(@Body() user: CreateUserDto) {
    return await this.authService.create(user);
  }

  @Get('whoami')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UserEntity })
  whoAmI(@Request() request) {
    const user = request.user;
    user.password = undefined;
    return user as User;
  }
}

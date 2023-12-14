import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { validateData } from 'src/common/utils/validate-data';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async readAll() {
    return await this.prisma.user.findMany();
  }

  async create(createUserDto: CreateUserDto) {
    await validateData(createUserDto);
    const res = await this.prisma.user.create({
      data: createUserDto,
    });
    return res;
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException('Bad request');
    }
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    await validateData(updateUserDto);
    const res = await this.prisma.user.update({
      data: updateUserDto,
      where: { id },
    });

    return res;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: { id },
    });
  }
}

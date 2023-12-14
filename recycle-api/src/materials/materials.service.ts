import { Injectable } from '@nestjs/common';
import { CreateMaterialDto } from './dto/create-material.dto';
import { UpdateMaterialDto } from './dto/update-material.dto';
import { validateData } from 'src/common/utils/validate-data';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class MaterialsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createMaterialDto: CreateMaterialDto) {
    await validateData(createMaterialDto);

    const res = await this.prisma.material.create({ data: createMaterialDto });

    return { material: res };
  }

  async findAll() {
    return await this.prisma.material.findMany({
      select: { name: true, icon: true, color: true, id: true },
    });
  }

  async update(id: number, updateMaterialDto: UpdateMaterialDto) {
    await validateData(updateMaterialDto);

    const res = await this.prisma.material.update({
      data: updateMaterialDto,
      where: { id },
    });

    return { material: res };
  }

  async remove(id: number) {
    return await this.prisma.material.delete({ where: { id } });
  }
}

import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RequestFindQueryDto } from './dto/request-find-query.dto';
import {
  getPaginateParams,
  paginateResponse,
} from 'src/common/utils/paginator';
import { validateData } from 'src/common/utils/validate-data';
import UpdateRequestStatusDto from './dto/update-request-status.dto';
import { optionalBooleanMapper } from 'src/common/validations/validations';

@Injectable()
export class RequestsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createRequestDto: CreateRequestDto) {
    await validateData(new CreateRequestDto(createRequestDto));
    const res = await this.prisma.request.create({ data: createRequestDto });

    return { request: res };
  }

  async findAll({ page, perPage, query = '', is_active }: RequestFindQueryDto) {
    await validateData(
      new RequestFindQueryDto({
        page: +page,
        perPage: +perPage,
        query: query,
        is_active: is_active === undefined ? undefined : String(is_active),
      }),
    );
    const status = optionalBooleanMapper.get(is_active);

    const total = await this.prisma.request.count({
      where: {
        OR: [
          { inn: { contains: query.toLowerCase(), mode: 'insensitive' } },
          {
            contact_phone: {
              contains: query.toLowerCase(),
              mode: 'insensitive',
            },
          },
          {
            contact_person: {
              contains: query.toLowerCase(),
              mode: 'insensitive',
            },
          },
        ],
        is_active: status,
      },
    });

    const requests = await this.prisma.request.findMany({
      ...getPaginateParams(page, perPage),
      where: {
        OR: [
          { inn: { contains: query, mode: 'insensitive' } },
          { contact_phone: { contains: query, mode: 'insensitive' } },
          { contact_person: { contains: query, mode: 'insensitive' } },
        ],
        is_active: status,
      },
    });

    return paginateResponse({ data: requests, total, limit: perPage, page });
  }

  async findOne(id: number) {
    if (!id) {
      throw new BadRequestException();
    }
    const res = await this.prisma.request.findUnique({ where: { id } });

    return { request: res };
  }

  async update(id: number, updateRequestDto: UpdateRequestDto) {
    await validateData(new UpdateRequestDto(updateRequestDto));
    const res = await this.prisma.request.update({
      data: updateRequestDto,
      where: { id },
    });

    return { request: res };
  }

  async updateRequestStatus(data: UpdateRequestStatusDto) {
    await validateData(
      new UpdateRequestStatusDto({ id: data.id, status: data.status }),
    );
    const res = await this.prisma.request.update({
      where: { id: data.id },
      data: { is_active: data.status },
    });

    return res;
  }

  async delete(id: number) {
    if (!id)
      throw new BadRequestException('request with that id was not found');

    const res = await this.prisma.request.delete({ where: { id } });

    return res;
  }

  async acceptRequest(id: number) {
    if (!id)
      throw new BadRequestException('request with that id was not found');

    const res = await this.prisma.request.update({
      where: { id },
      data: { is_accept: true, is_active: false },
    });

    return res;
  }
}

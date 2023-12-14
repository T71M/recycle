import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { deleteFile } from 'src/common/utils/deleteFile';
import {
  paginateResponse,
  getPaginateParams,
} from 'src/common/utils/paginator';
import LatLngDto from 'src/common/dto/latLng.dto';
import { Partner } from '@prisma/client';
import { CreatePartnerDto } from './dto/create-partner.dto';
import { PartnersFindQuery } from './dto/partners-find-query.dto';
import { optionalBooleanMapper } from 'src/common/validations/validations';
import { UpdatePartnerDto } from './dto/update-partner.dto';
import UpdateRequestStatusDto from 'src/requests/dto/update-request-status.dto';
import { asyncMap } from 'src/common/utils/asyncMap';
import { validateData } from 'src/common/utils/validate-data';

@Injectable()
export class PartnersService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPartnerDto: CreatePartnerDto & { materials: string }) {
    const newData = this.prepareDataForCreation(createPartnerDto);
    await validateData(newData.validated);
    console.log(
      '🚀 ~ file: partners.service.ts:23 ~ PartnersService ~ create ~ newData:',
      newData,
    );

    const res = await this.prisma.partner.create({ data: newData.rest });
    await this.createPartnerMaterials(newData.materials, res.id);

    return { partner: res };
  }

  async findAll({ page, perPage, is_active, query = '' }: PartnersFindQuery) {
    const data = new PartnersFindQuery({
      page: +page,
      perPage: +perPage,
      is_active,
      query,
    });
    await validateData(data);
    const status = optionalBooleanMapper.get(is_active);
    const total = await this.prisma.partner.count({
      where: {
        is_active: status,
        OR: [
          { name: { contains: query.toLowerCase(), mode: 'insensitive' } },
          {
            contact_person: {
              contains: query.toLowerCase(),
              mode: 'insensitive',
            },
          },
          {
            contact_phone: {
              contains: query.toLowerCase(),
              mode: 'insensitive',
            },
          },
          { inn: { contains: query.toLowerCase(), mode: 'insensitive' } },
        ],
      },
    });
    const partners = await this.getPaginatedPartners({
      page,
      perPage,
      is_active: status,
      query,
    });

    return paginateResponse({ data: partners, total, page, limit: perPage });
  }

  async findByCoordinates(
    northEast: LatLngDto,
    southWest: LatLngDto,
    materials: string[] = [],
  ) {
    await this.validateCoordinates(northEast, southWest);
    const parsedMaterials = this.parseMaterials(materials);
    const partners = await this.findPartnersByCoordinates(
      northEast,
      southWest,
      parsedMaterials,
    );

    return { partners };
  }

  async findOne(id: number, fromAdmin?: string) {
    const partner = await this.getPartnerById(id, fromAdmin);
    return { partner };
  }

  async update(
    id: number,
    updatePartnerDto: UpdatePartnerDto,
    newImage?: string,
  ) {
    const newData = await this.prepareDataForUpdate(
      id,
      updatePartnerDto,
      newImage,
    );

    await validateData(newData.validated);

    const partner = await this.updatePartner(id, newData.rest);

    await this.updatePartnerMaterials(id, newData.materials, partner);

    return { partner };
  }

  public async toggleIsPartnerActive(id: number) {
    const partner = await this.findOne(id);
    const is_check = partner.partner.is_active;
    const updated = await this.update(id, { is_active: !is_check });

    return { partner: updated.partner };
  }

  private prepareDataForCreation(
    createPartnerDto: CreatePartnerDto & { materials: string },
  ) {
    const newData = { ...createPartnerDto } as CreatePartnerDto & {
      materials: string | number[];
    };
    newData.lat = Number(createPartnerDto.lat);
    newData.long = Number(createPartnerDto.long);
    newData.materials = this.parseMaterials(createPartnerDto.materials);
    newData.is_active = optionalBooleanMapper.get(newData.is_active);

    const validated = new CreatePartnerDto(newData);
    newData.materials = undefined;
    return { rest: newData, materials: validated.materials, validated };
  }

  private async createPartnerMaterials(materials: number[], partnerId: number) {
    await this.prisma.partnerMaterials.createMany({
      data: materials.map((v) => ({ material_id: v, partner_id: partnerId })),
    });
  }

  private async getPaginatedPartners({
    page,
    perPage,
    is_active,
    query = '',
  }: PartnersFindQuery) {
    return await this.prisma.partner.findMany({
      ...getPaginateParams(+page, +perPage),
      where: {
        is_active,
        OR: [
          { name: { contains: query, mode: 'insensitive' } },
          { contact_person: { contains: query, mode: 'insensitive' } },
          { contact_phone: { contains: query, mode: 'insensitive' } },
          { inn: { contains: query, mode: 'insensitive' } },
        ],
      },
      include: { PartnerMaterials: { include: { material: true } } },
    });
  }

  private async validateCoordinates(
    northEast: LatLngDto,
    southWest: LatLngDto,
  ) {
    await Promise.all([
      validateData(new LatLngDto(northEast)),
      validateData(new LatLngDto(southWest)),
    ]);
  }

  private parseMaterials(materials: string[] | string | number[]) {
    if (typeof materials === 'string') {
      return (materials as string).split(',').map(Number);
    }
    return (materials as string[]).map(Number).filter((v) => !Number.isNaN(v));
  }

  private async findPartnersByCoordinates(
    northEast: LatLngDto,
    southWest: LatLngDto,
    materials: number[],
  ) {
    const { lat: neLat, lng: neLng } = northEast;
    const { lat: swLat, lng: swLng } = southWest;

    return await this.prisma.partner.findMany({
      include: { PartnerMaterials: { include: { material: true } } },
      where: {
        AND: [
          { is_active: true },
          { lat: { gte: swLat } },
          { lat: { lte: neLat } },
          { long: { gte: swLng } },
          { long: { lte: neLng } },
          {
            PartnerMaterials: {
              some: {
                material_id: { in: materials.length ? materials : undefined },
              },
            },
          },
        ],
      },
    });
  }

  private async getPartnerById(id: number, fromAdmin?: string) {
    if (!id) {
      throw new BadRequestException('Partner with this id not found');
    }

    const partner = await this.prisma.partner.findUniqueOrThrow({
      where: { id },
      include: { PartnerMaterials: true },
    });

    if (fromAdmin === 'true') {
      const res = { ...partner, materials: [] } as Partner & {
        materials: number[];
      };
      res.materials = partner.PartnerMaterials?.map((v) => v.material_id) ?? [];
      return res;
    }

    return partner;
  }

  private async prepareDataForUpdate(
    id: number,
    updatePartnerDto: UpdatePartnerDto,
    newImage?: string,
  ) {
    const newData = { ...updatePartnerDto } as UpdatePartnerDto & {
      materials: string | number[];
    };
    const oldImage = (await this.findOne(id)).partner.image;

    newData.lat = Number(newData.lat);
    newData.long = Number(newData.long);
    newData.materials = this.parseMaterials(updatePartnerDto.materials);
    newData.is_active = optionalBooleanMapper.get(newData.is_active);

    if (newImage || newImage === '') {
      newData.image = newImage;
      deleteFile(oldImage);
    }

    const validated = new UpdatePartnerDto({
      ...newData,
    });
    newData.materials = undefined;
    return { rest: newData, materials: validated.materials, validated };
  }

  private async updatePartner(id: number, data: any) {
    return await this.prisma.partner.update({
      where: { id },
      data,
      include: { PartnerMaterials: true },
    });
  }

  private async updatePartnerMaterials(
    id: number,
    materials: number[],
    partner: any,
  ) {
    if (materials?.length) {
      await this.prisma.partnerMaterials.deleteMany({
        where: {
          AND: [{ partner_id: id }, { material_id: { notIn: materials } }],
        },
      });

      const materialsSet = new Set(
        partner.PartnerMaterials.map((v) => v.material_id),
      );
      await asyncMap(materials, async (v) => {
        if (materialsSet.has(v)) {
          return;
        }
        return await this.prisma.partnerMaterials.create({
          data: { partner_id: id, material_id: v },
        });
      });
    }
  }

  async updatePartnerStatus(data: UpdateRequestStatusDto) {
    await validateData(
      new UpdateRequestStatusDto({ id: data.id, status: data.status }),
    );
    const res = await this.prisma.partner.update({
      where: { id: data.id },
      data: { is_active: data.status },
    });

    return res;
  }
}

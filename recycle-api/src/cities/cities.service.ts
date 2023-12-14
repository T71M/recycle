import { Injectable } from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import axios from 'axios';
import { PrismaService } from 'src/prisma/prisma.service';
import LatLngDto from 'src/common/dto/latLng.dto';
import FindCityResponseDto from './dto/find-city.response.dto';
import { validateData } from 'src/common/utils/validate-data';
import { UpdateCityDto } from './dto/update-city.dto';

@Injectable()
export class CitiesService {
  constructor(private readonly prisma: PrismaService) {}
  public async create(createCityDto: CreateCityDto) {
    const data = new CreateCityDto(createCityDto);
    await validateData(data);

    const res = await this.prisma.city.create({
      data: data,
    });

    return res;
  }

  public async findAll() {
    const res = await this.prisma.city.findMany();

    return { cities: res };
  }

  public async updateCity(updateCityDto: UpdateCityDto, id: number) {
    const data = new UpdateCityDto({ ...updateCityDto, id: undefined });
    await validateData(data);

    const res = await this.prisma.city.update({
      where: { id },
      data: data,
    });

    return res;
  }

  public async isUserInAllowedCity(coordinates: LatLngDto) {
    await validateData(coordinates);
    const { lat, lng } = coordinates;
    console.log(coordinates);
    const allowedCity = await this.prisma.city.findFirst({
      where: {
        AND: [
          { north_lat: { gte: lat } },
          { east_lat: { lte: lat } },
          { north_long: { gte: lng } },
          { east_long: { lte: lng } },
        ],
      },
    });
    if (allowedCity) {
      return { allowedCity: allowedCity };
    }

    const res = await axios.get<FindCityResponseDto>(
      `https://nominatim.openstreetmap.org/reverse?lat=${coordinates.lat}&lon=${coordinates.lng}&format=jsonv2`,
    );

    if (!res) return undefined;

    return { city: res.data.address.city };
  }

  public async delete(id: number) {
    const res = await this.prisma.city.delete({ where: { id } });

    return res;
  }
}

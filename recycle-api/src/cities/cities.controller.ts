import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  Delete,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import LatLngDto from 'src/common/dto/latLng.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import IsAllowedCityResponseDto from './dto/is-allowed-city-response.dto';
import { AuthGuard } from '@nestjs/passport';
import { UpdateCityDto } from './dto/update-city.dto';
import { City } from './entities/city.entity';
import FindCitiesResponseDto from './dto/find-cities.response.dto';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Post()
  @ApiOkResponse({ type: City })
  create(@Body() createCityDto: CreateCityDto) {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  @ApiOkResponse({ type: FindCitiesResponseDto })
  findAll() {
    return this.citiesService.findAll();
  }

  @Get('/is-in-allowed-city')
  @ApiOkResponse({ type: IsAllowedCityResponseDto })
  public async isUserInAllowedCity(@Query() coordinates: LatLngDto) {
    return await this.citiesService.isUserInAllowedCity({
      lat: +coordinates.lat,
      lng: +coordinates.lng,
    });
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  @ApiOkResponse({ type: City })
  public async deleteCity(@Param('id') id: string) {
    return await this.citiesService.delete(+id);
  }

  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @ApiOkResponse({ type: City })
  public async updateCity(
    @Body() updateCityDto: UpdateCityDto,
    @Query('id') id: string,
  ) {
    return await this.citiesService.updateCity(updateCityDto, +id);
  }
}

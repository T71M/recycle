import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { PartnersService } from './partners.service';
import { CreatePartnerWithFileDto } from './dto/create-partner.dto';
import {
  UpdatePartnerDto,
  UpdatePartnerWithFileDto,
} from './dto/update-partner.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PartnersFindQuery } from './dto/partners-find-query.dto';
import { PartnersFindResponseDto } from './dto/partenrs-find-response.dto';
import { AuthGuard } from '@nestjs/passport';
import GetPartnerByCoordinatesDto from './dto/findPartnersByCoordinates.dto';
import LatLngDto from 'src/common/dto/latLng.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Partner } from './entities/partner.entity';
import PartnerResponseDto from './dto/partner.response.dto';

@Controller('partners')
@ApiTags('Partners')
export class PartnersController {
  constructor(private readonly partnersService: PartnersService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @ApiOkResponse({ type: PartnerResponseDto })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiBody({
    type: CreatePartnerWithFileDto,
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  create(
    @Body() createPartnerDto: CreatePartnerWithFileDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    if (image && 'filename' in image) {
      createPartnerDto.image = `/files/${image.filename}`;
    }
    return this.partnersService.create(createPartnerDto as never);
  }

  @Get()
  @ApiOkResponse({ type: PartnersFindResponseDto })
  findAll(@Query() query: PartnersFindQuery) {
    return this.partnersService.findAll(query);
  }
  @ApiOkResponse({ type: Partner, isArray: true })
  @Get('coordinates')
  async getPartnersByCoordinates(
    @Query() coordinates: GetPartnerByCoordinatesDto,
  ) {
    const northEast: LatLngDto = {
      lat: +coordinates.northLat,
      lng: +coordinates.northLong,
    };

    const southWest: LatLngDto = {
      lat: +coordinates.southLat,
      lng: +coordinates.southLong,
    };
    return await this.partnersService.findByCoordinates(
      northEast,
      southWest,
      coordinates.materials,
    );
  }

  @Get(':id')
  @ApiOkResponse({ type: PartnerResponseDto })
  findOne(@Param('id') id: string, @Query('admin') fromAdmin: string) {
    return this.partnersService.findOne(+id, fromAdmin);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('image'))
  @ApiOkResponse({ type: PartnerResponseDto })
  @ApiBody({
    type: UpdatePartnerDto,
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  update(
    @Param('id') id: string,
    @Body() updatePartnerDto: UpdatePartnerWithFileDto,
    @UploadedFile() image: Express.Multer.File,
  ) {
    let newImage: string = undefined;
    if (image && 'filename' in image) {
      newImage = `/files/${image.filename}`;
    }

    return this.partnersService.update(+id, updatePartnerDto, newImage);
  }

  @Post(':id/status')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: Partner })
  async remove(@Param('id') id: string, @Body('status') status: boolean) {
    return await this.partnersService.updatePartnerStatus({
      id: +id,
      status: status,
    });
  }
}

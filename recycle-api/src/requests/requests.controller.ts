import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { RequestsService } from './requests.service';
import { CreateRequestDto } from './dto/create-request.dto';
import { UpdateRequestDto } from './dto/update-request.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { RequestFindQueryDto } from './dto/request-find-query.dto';
import { AuthGuard } from '@nestjs/passport';
import UpdateRequestStatusDto from './dto/update-request-status.dto';
import UpdateRequestResponseDto from './dto/update-request.response.dto';
import RequestFindResponseDto from './dto/request-find.response.dto';

@Controller('requests')
@ApiTags('Partner Requests')
export class RequestsController {
  constructor(private readonly requestsService: RequestsService) {}

  @Post()
  @ApiOkResponse({ type: UpdateRequestResponseDto })
  async create(@Body() createRequestDto: CreateRequestDto) {
    return await this.requestsService.create(createRequestDto);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: RequestFindResponseDto })
  async findAll(@Query() query: RequestFindQueryDto) {
    return await this.requestsService.findAll(query);
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UpdateRequestResponseDto })
  async findOne(@Param('id') id: string) {
    return await this.requestsService.findOne(+id);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UpdateRequestResponseDto })
  async update(
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ) {
    return await this.requestsService.update(+id, updateRequestDto);
  }

  @Post(':id/accept')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  async acceptRequest(@Param('id') id: string) {
    return await this.requestsService.acceptRequest(+id);
  }

  @Post(':id/status')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateRequestStatusDto })
  async remove(@Param('id') id: string, @Body('status') status: boolean) {
    return await this.requestsService.updateRequestStatus({
      id: +id,
      status: status,
    });
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ type: UpdateRequestResponseDto })
  async delete(@Param('id') id: string) {
    return await this.requestsService.delete(+id);
  }
}

import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
} from '@nestjs/swagger';
import { RestaurantService } from '../services/restaurant.service';
import {
  CreateRestaurantDto,
  UpdateRestaurantDto,
  RestaurantResponseDto,
} from '@libs/contracts';

@ApiTags('restaurants')
@Controller('restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new restaurant' })
  @ApiResponse({ status: 201, type: RestaurantResponseDto })
  async create(@Body() dto: CreateRestaurantDto) {
    return this.restaurantService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all restaurants' })
  @ApiResponse({ status: 200, type: [RestaurantResponseDto] })
  async findAll() {
    return this.restaurantService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get restaurant by ID' })
  @ApiParam({ name: 'id', description: 'Restaurant UUID' })
  @ApiResponse({ status: 200, type: RestaurantResponseDto })
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant UUID' })
  @ApiResponse({ status: 200, type: RestaurantResponseDto })
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() dto: UpdateRestaurantDto,
  ) {
    return this.restaurantService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete restaurant' })
  @ApiParam({ name: 'id', description: 'Restaurant UUID' })
  @ApiResponse({ status: 204 })
  async delete(@Param('id', ParseUUIDPipe) id: string) {
    return this.restaurantService.delete(id);
  }
}

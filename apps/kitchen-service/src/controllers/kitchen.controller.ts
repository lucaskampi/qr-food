import {
  Controller,
  Get,
  Put,
  Param,
  Query,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { KitchenService } from '../services/kitchen.service';
import { OrderResponseDto, OrderStatus } from '@libs/contracts';

@ApiTags('kitchen')
@Controller('kitchen')
export class KitchenController {
  constructor(private readonly kitchenService: KitchenService) {}

  @Get('pending-orders')
  @ApiQuery({ name: 'restaurantId', required: false })
  @ApiOperation({ summary: 'Get pending orders for kitchen display' })
  @ApiResponse({ status: 200, type: [OrderResponseDto] })
  async getPendingOrders(@Query('restaurantId') restaurantId?: string) {
    return this.kitchenService.getPendingOrders(restaurantId);
  }

  @Get('orders/:id')
  @ApiOperation({ summary: 'Get order details for kitchen' })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  async getOrderDetails(@Param('id', ParseUUIDPipe) id: string) {
    return this.kitchenService.getOrderDetails(id);
  }

  @Put('orders/:id/start')
  @ApiOperation({ summary: 'Start preparing order' })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  async startPreparing(@Param('id', ParseUUIDPipe) id: string) {
    return this.kitchenService.startPreparing(id);
  }

  @Put('orders/:id/ready')
  @ApiOperation({ summary: 'Mark order as ready' })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  async markReady(@Param('id', ParseUUIDPipe) id: string) {
    return this.kitchenService.markReady(id);
  }

  @Put('orders/:id/complete')
  @ApiOperation({ summary: 'Complete order' })
  @ApiParam({ name: 'id', description: 'Order UUID' })
  @ApiResponse({ status: 200, type: OrderResponseDto })
  async complete(@Param('id', ParseUUIDPipe) id: string) {
    return this.kitchenService.complete(id);
  }
}

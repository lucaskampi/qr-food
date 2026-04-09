import { Controller, Get, Param, Query, NotFoundException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { OrderService } from '../services/order.service';

@ApiTags('qr')
@Controller('qr')
export class QrController {
  constructor(private readonly orderService: OrderService) {}

  @Get('order/:tableId')
  @ApiOperation({ summary: 'Get active order for table (QR flow)' })
  @ApiParam({ name: 'tableId', description: 'Table UUID from QR code' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'No active order found' })
  async getActiveOrder(@Param('tableId') tableId: string) {
    const orders = await this.orderService.findByTable(tableId);
    const activeOrder = orders.find(
      (order) =>
        order.status === 'PENDING' ||
        order.status === 'CONFIRMED' ||
        order.status === 'IN_PREPARATION',
    );

    if (!activeOrder) {
      throw new NotFoundException('No active order found for this table');
    }

    return activeOrder;
  }

  @Get('validate/:tableId/:restaurantId')
  @ApiOperation({ summary: 'Validate QR code (check table belongs to restaurant)' })
  @ApiParam({ name: 'tableId', description: 'Table UUID' })
  @ApiParam({ name: 'restaurantId', description: 'Restaurant UUID' })
  @ApiResponse({ status: 200 })
  @ApiResponse({ status: 404, description: 'Invalid QR code' })
  async validateQr(
    @Param('tableId') tableId: string,
    @Param('restaurantId') restaurantId: string,
  ) {
    const menuServiceUrl = process.env.MENU_SERVICE_URL || 'http://localhost:3001';

    try {
      const response = await fetch(`${menuServiceUrl}/api/restaurants/${restaurantId}`);
      
      if (!response.ok) {
        throw new NotFoundException('Invalid QR code');
      }
      
      const restaurant = await response.json();

      const validTable = restaurant.tables?.some(
        (table: any) => table.id === tableId,
      );

      if (!validTable) {
        throw new NotFoundException('Invalid QR code');
      }

      return {
        valid: true,
        restaurant: {
          id: restaurant.id,
          name: restaurant.name,
        },
        table: {
          id: tableId,
          number: restaurant.tables?.find(
            (t: any) => t.id === tableId,
          )?.number,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new NotFoundException('Invalid QR code');
    }
  }
}

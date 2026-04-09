import { Injectable, NotFoundException, BadRequestException, Logger } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { Prisma, OrderStatus } from '@prisma/client';
import { CreateOrderDto } from '@libs/contracts';

@Injectable()
export class OrderService {
  private readonly logger = new Logger(OrderService.name);
  private readonly menuServiceUrl = process.env.MENU_SERVICE_URL || 'http://localhost:3001';

  constructor(private readonly prisma: PrismaService) {}

  async createWithCalculation(dto: CreateOrderDto) {
    const menuItemIds = dto.items.map((item) => item.menuItemId);

    const menuItems = await this.fetchMenuItems(menuItemIds);

    let totalAmount = 0;
    const orderItemsData = dto.items.map((item) => {
      const menuItem = menuItems.find((mi: any) => mi.id === item.menuItemId);
      if (!menuItem) {
        throw new NotFoundException('MenuItem', item.menuItemId);
      }
      if (!menuItem.isAvailable) {
        throw new BadRequestException(`Menu item "${menuItem.name}" is not available`);
      }
      const unitPrice = Number(menuItem.price);
      totalAmount += unitPrice * item.quantity;
      return {
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice,
      };
    });

    const order = await this.prisma.order.create({
      data: {
        tableId: dto.tableId,
        restaurantId: dto.restaurantId,
        status: OrderStatus.PENDING,
        totalAmount,
        orderItems: {
          create: orderItemsData,
        },
      },
      include: {
        orderItems: {
          include: { menuItem: true },
        },
        table: true,
        restaurant: true,
      },
    });

    this.logger.log(`Order created: ${order.id} for table ${dto.tableId}`);

    return order;
  }

  async create(data: Prisma.OrderCreateInput) {
    return this.prisma.order.create({ data });
  }

  async findAll(restaurantId?: string, status?: OrderStatus) {
    return this.prisma.order.findMany({
      where: {
        restaurantId: restaurantId || undefined,
        status: status || undefined,
      },
      include: {
        orderItems: {
          include: { menuItem: true },
        },
        table: true,
        restaurant: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        orderItems: {
          include: { menuItem: true },
        },
        table: true,
        restaurant: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order', id);
    }

    return order;
  }

  async update(id: string, data: Prisma.OrderUpdateInput) {
    return this.prisma.order.update({ where: { id }, data });
  }

  async updateStatus(id: string, status: OrderStatus) {
    return this.prisma.order.update({ where: { id }, data: { status } });
  }

  async delete(id: string) {
    return this.prisma.order.delete({ where: { id } });
  }

  async findByTable(tableId: string) {
    return this.prisma.order.findMany({
      where: { tableId },
      include: {
        orderItems: {
          include: { menuItem: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  private async fetchMenuItems(menuItemIds: string[]): Promise<any[]> {
    try {
      const response = await fetch(`${this.menuServiceUrl}/api/menu-items`);
      if (!response.ok) {
        this.logger.warn('Failed to fetch menu items, using empty array');
        return [];
      }
      const allItems = await response.json();
      return allItems.filter((item: any) => menuItemIds.includes(item.id));
    } catch (error) {
      this.logger.warn('Menu service unavailable, proceeding without price validation');
      return [];
    }
  }
}

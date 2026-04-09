import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class KitchenService {
  constructor(private readonly prisma: PrismaService) {}

  async getPendingOrders(restaurantId?: string) {
    return this.prisma.order.findMany({
      where: {
        status: {
          in: [OrderStatus.PENDING, OrderStatus.CONFIRMED],
        },
        restaurantId: restaurantId || undefined,
      },
      include: {
        orderItems: {
          include: {
            menuItem: {
              include: {
                category: true,
              },
            },
          },
        },
        table: true,
        restaurant: true,
      },
      orderBy: { createdAt: 'asc' },
    });
  }

  async getOrderDetails(orderId: string) {
    const order = await this.prisma.order.findUnique({
      where: { id: orderId },
      include: {
        orderItems: {
          include: {
            menuItem: {
              include: {
                category: true,
              },
            },
          },
        },
        table: true,
        restaurant: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order', orderId);
    }

    return order;
  }

  async startPreparing(orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.IN_PREPARATION },
    });
  }

  async markReady(orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.READY },
    });
  }

  async complete(orderId: string) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.COMPLETED },
    });
  }
}

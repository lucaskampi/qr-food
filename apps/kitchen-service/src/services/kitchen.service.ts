import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { PrismaService } from '@libs/database';
import { OrderStatus } from '@prisma/client';
import { OrderStatusChangedEvent } from '@libs/contracts';

@Injectable()
export class KitchenService {
  private readonly logger = new Logger(KitchenService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

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
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.IN_PREPARATION },
    });

    this.eventEmitter.emit(
      'order.status.changed',
      new OrderStatusChangedEvent(order.id, order.status, new Date()),
    );

    return order;
  }

  async markReady(orderId: string) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.READY },
    });

    this.eventEmitter.emit(
      'order.status.changed',
      new OrderStatusChangedEvent(order.id, order.status, new Date()),
    );

    return order;
  }

  async complete(orderId: string) {
    const order = await this.prisma.order.update({
      where: { id: orderId },
      data: { status: OrderStatus.COMPLETED },
    });

    this.eventEmitter.emit(
      'order.status.changed',
      new OrderStatusChangedEvent(order.id, order.status, new Date()),
    );

    this.logger.log(`Order ${orderId} completed`);

    return order;
  }
}

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { Prisma, OrderStatus } from '@prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

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
}

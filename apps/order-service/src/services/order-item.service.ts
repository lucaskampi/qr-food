import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class OrderItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.OrderItemCreateInput) {
    return this.prisma.orderItem.create({ data });
  }

  async findAll(orderId: string) {
    return this.prisma.orderItem.findMany({
      where: { orderId },
      include: { menuItem: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.orderItem.findUnique({
      where: { id },
      include: { menuItem: true, order: true },
    });
  }

  async delete(id: string) {
    return this.prisma.orderItem.delete({ where: { id } });
  }
}

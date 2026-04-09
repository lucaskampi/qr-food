import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class MenuItemService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.MenuItemCreateInput) {
    return this.prisma.menuItem.create({ data });
  }

  async findAll(categoryId?: string) {
    return this.prisma.menuItem.findMany({
      where: categoryId ? { categoryId } : undefined,
      include: { category: true },
    });
  }

  async findOne(id: string) {
    return this.prisma.menuItem.findUnique({
      where: { id },
      include: { category: true },
    });
  }

  async update(id: string, data: Prisma.MenuItemUpdateInput) {
    return this.prisma.menuItem.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.menuItem.delete({ where: { id } });
  }
}

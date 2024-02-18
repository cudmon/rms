import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class UsageService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsages(args?: Prisma.UsageFindManyArgs) {
    return await this.prisma.usage.findMany(args);
  }

  async getUsage(usageId: string) {
    return await this.prisma.usage.findUniqueOrThrow({
      where: {
        id: usageId,
      },
    });
  }

  async getActiveUsage(tableId: string) {
    return await this.prisma.usage.findFirstOrThrow({
      where: {
        tableId,
        end: null,
      },
    });
  }

  async getUsageWithOrders(usageId: string) {
    return await this.prisma.usage.findUniqueOrThrow({
      where: {
        id: usageId,
      },
      include: {
        order: true,
      },
    });
  }

  async getActiveUsageWithOrders(tableId: string) {
    return await this.prisma.usage.findFirst({
      where: {
        tableId,
        end: null,
      },
      include: {
        order: true,
      },
    });
  }

  async createUsage(tableId: string) {
    return await this.prisma.usage.create({
      data: {
        tableId,
        start: new Date(),
      },
    });
  }
}

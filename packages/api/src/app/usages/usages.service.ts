import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";
import { TablesService } from "@/app/tables/tables.service";

@Injectable()
export class UsagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tablesService: TablesService
  ) {}

  async findAll(params: { take?: number; skip?: number }) {
    return await this.prisma.usage.findMany(params);
  }

  async findById(id: string) {
    return await this.prisma.usage.findUnique({
      where: {
        id,
      },
    });
  }

  async findWithOrders(usageId: string) {
    return await this.prisma.usage.findUnique({
      where: {
        id: usageId,
      },
      include: {
        order: true,
      },
    });
  }

  async findActive(tableId: string) {
    return await this.prisma.usage.findFirst({
      where: {
        tableId,
        end: null,
      },
      include: {
        order: {
          include: {
            menu: true,
          },
        },
      },
    });
  }

  async findActiveToCreateBill(tableId: string) {
    return await this.prisma.usage.findFirst({
      where: {
        tableId,
        end: null,
        order: {
          some: {
            status: "SERVED",
          },
        },
      },
      include: {
        order: {
          where: {
            status: "SERVED",
          },
          include: {
            menu: true,
          },
        },
      },
    });
  }

  async create(tableId: string) {
    await this.tablesService.updateStatusById(tableId, "EATING");

    return await this.prisma.usage.create({
      data: {
        tableId,
        start: new Date(),
      },
    });
  }

  async end(id: string) {
    const usage = await this.findById(id);

    if (!usage) {
      throw new Error("NO_ACTIVE_USAGE");
    }

    await this.tablesService.updateStatusById(usage.tableId, "IDLE");

    return await this.prisma.usage.update({
      where: {
        id,
      },
      data: {
        end: new Date(),
      },
    });
  }
}

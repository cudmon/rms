import { Injectable } from "@nestjs/common";
import { OrderStatus, Usage } from "@prisma/client";
import { MenuService } from "@/app/menu/menu.service";
import { PrismaService } from "@/providers/prisma.service";
import { TablesService } from "@/app/tables/tables.service";
import { UsagesService } from "@/app/usages/usages.service";

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly menuService: MenuService,
    private readonly tablesService: TablesService,
    private readonly usagesService: UsagesService
  ) {}

  async findAll(params: { take?: number; skip?: number }) {
    return await this.prisma.order.findMany(params);
  }

  async findById(id: string) {
    return await this.prisma.order.findUnique({
      where: {
        id,
      },
    });
  }

  async findByStatus(
    status: OrderStatus,
    params: { take?: number; skip?: number }
  ) {
    return await this.prisma.order.findMany({
      where: {
        status,
      },
      include: {
        menu: true,
      },
      ...params,
    });
  }

  async create(data: { menuId: string; tableId: string; quantity: number }) {
    let usage: Usage;

    const menu = await this.menuService.findOne({ where: { id: data.menuId } });
    const table = await this.tablesService.findById(data.tableId);

    if (table.status === "IDLE") {
      usage = await this.usagesService.create(data.tableId);
    }

    if (table.status === "EATING") {
      usage = await this.usagesService.findActive(data.tableId);
    }

    if (table.status === "RESERVED") {
      throw new Error("TABLE_IS_RESERVED");
    }

    return await this.prisma.order.create({
      data: {
        usageId: usage.id,
        menuId: data.menuId,
        quantity: data.quantity,
        price: menu.price * data.quantity,
      },
    });
  }

  async updateStatusById(id: string, status: OrderStatus) {
    return await this.prisma.order.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}

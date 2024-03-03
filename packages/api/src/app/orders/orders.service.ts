import { Injectable } from "@nestjs/common";
import { OrderStatus, Usage } from "@prisma/client";
import { MenuService } from "@/app/menu/menu.service";
import { CreateOrderDto } from "@/app/orders/orders.dto";
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

  async bulkCreate(tableId: string, data: CreateOrderDto[]) {
    let usage: Usage;

    const table = await this.tablesService.findById(tableId);

    if (!table) {
      throw new Error("TABLE_NOT_FOUND");
    }

    const menus = await this.menuService.findMultipleByIds(
      data.map((order) => order.menuId)
    );

    if (table.status === "IDLE") {
      usage = await this.usagesService.create(tableId);
    }

    if (table.status === "EATING") {
      usage = await this.usagesService.findActive(tableId);
    }

    if (table.status === "RESERVED") {
      throw new Error("TABLE_IS_RESERVED");
    }

    return await this.prisma.order.createMany({
      data: [
        ...data.map((order) => ({
          usageId: usage.id,
          menuId: order.menuId,
          quantity: order.quantity,
          price: menus.find((menu) => menu.id === order.menuId).price,
        })),
      ],
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

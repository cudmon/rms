import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { MenuService } from "@/app/menu/menu.service";
import { TableService } from "@/app/table/table.service";
import { UsageService } from "@/app/usage/usage.service";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class OrderService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tableService: TableService,
    private readonly usageService: UsageService,
    private readonly menuService: MenuService
  ) {}

  async findAll(args: Prisma.OrderFindManyArgs) {
    return await this.prisma.order.findMany(args);
  }

  async findOne(args: Prisma.OrderFindUniqueOrThrowArgs) {
    return await this.prisma.order.findUniqueOrThrow(args);
  }

  async create(menuId: string, tableId: string, quantity: number) {
    let usageId = "";

    const menu = await this.menuService.findOne({ where: { id: menuId } });
    const table = await this.tableService.findOne({ where: { id: tableId } });

    if (table.status === "IDLE") {
      await this.tableService.update({
        where: {
          id: tableId,
        },
        data: {
          status: "EATING",
        },
      });

      const usage = await this.usageService.createUsage(tableId);

      usageId = usage.id;
    } else if (table.status === "EATING") {
      const usage = await this.usageService.getActiveUsage(tableId);

      usageId = usage.id;
    }

    return await this.prisma.order.create({
      data: {
        menuId,
        quantity,
        usageId,
        price: menu.price * quantity,
      },
    });
  }

  async update(args: Prisma.OrderUpdateArgs) {
    return await this.prisma.order.update(args);
  }
  async remove(args: Prisma.OrderDeleteArgs) {
    return await this.prisma.order.delete(args);
  }
}

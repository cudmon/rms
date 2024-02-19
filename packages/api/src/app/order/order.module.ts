import { Module } from "@nestjs/common";
import { MenuService } from "@/app/menu/menu.service";
import { OrderService } from "@/app/order/order.service";
import { TableService } from "@/app/table/table.service";
import { UsageService } from "@/app/usage/usage.service";
import { PrismaService } from "@/providers/prisma.service";
import { OrderController } from "@/app/order/order.controller";

@Module({
  controllers: [OrderController],
  providers: [
    OrderService,
    TableService,
    UsageService,
    MenuService,
    PrismaService,
  ],
})
export class OrderModule {}

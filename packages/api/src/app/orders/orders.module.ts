import { Module } from "@nestjs/common";
import { MenuService } from "@/app/menu/menu.service";
import { OrdersService } from "@/app/orders/orders.service";
import { TablesService } from "@/app/tables/tables.service";
import { UsagesService } from "@/app/usages/usages.service";
import { PrismaService } from "@/providers/prisma.service";
import { OrdersController } from "@/app/orders/orders.controller";

@Module({
  controllers: [OrdersController],
  providers: [
    OrdersService,
    TablesService,
    UsagesService,
    MenuService,
    PrismaService,
  ],
})
export class OrdersModule {}

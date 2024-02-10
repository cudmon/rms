import { Module } from "@nestjs/common";
import { OrderService } from "@/app/order/order.service";
import { PrismaService } from "@/providers/prisma.service";
import { OrderController } from "@/app/order/order.controller";

@Module({
  controllers: [OrderController],
  providers: [OrderService, PrismaService],
})
export class OrderModule {}

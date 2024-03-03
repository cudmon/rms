import { OrderStatus } from "@prisma/client";
import { CreateOrderDto } from "@/app/orders/orders.dto";
import { CurrentClient } from "@/app/auth/types/auth.type";
import { OrdersService } from "@/app/orders/orders.service";
import { Client } from "@/app/auth/decorators/client.decorator";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

@Controller("orders")
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async findAll(@Query() params: { take?: number; skip?: number }) {
    return await this.ordersService.findAll(params);
  }

  @Get(":id")
  async findById(@Param("id", ParseUUIDPipe) id: string) {
    const order = await this.ordersService.findById(id);

    if (!order) {
      throw new Error("Order not found");
    }

    return order;
  }

  @Get("/status/:status")
  async findByStatus(
    @Param("status") status: OrderStatus,
    @Query() params: { take?: number; skip?: number }
  ) {
    return await this.ordersService.findByStatus(status, params);
  }

  @Post()
  async create(
    @Client() client: CurrentClient,
    @Body() orders: CreateOrderDto[]
  ) {
    return await this.ordersService.bulkCreate(client.id, orders);
  }

  @Patch("/cancel/:id")
  async cancel(@Param("id", ParseUUIDPipe) id: string) {
    return await this.ordersService.updateStatusById(id, "CANCELED");
  }

  @Patch("/serve/:id")
  async finish(@Param("id", ParseUUIDPipe) id: string) {
    return await this.ordersService.updateStatusById(id, "SERVED");
  }

  @Patch("/finish/:id")
  async cooking(@Param("id", ParseUUIDPipe) id: string) {
    return await this.ordersService.updateStatusById(id, "FINISHED");
  }
}

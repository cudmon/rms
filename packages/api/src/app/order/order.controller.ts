import { Prisma } from "@prisma/client";
import { OrderService } from "@/app/order/order.service";
import { CreateOrderDto, UpdateOrderDto } from "@/app/order/order.dto";
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";

@Controller("orders")
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async findAll(@Query("take") take?: number, @Query("skip") skip?: number) {
    return await this.orderService.findAll({
      take: take || 100,
      skip: skip || 0,
    });
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    try {
      return await this.orderService.findOne({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException();
        }
      }
    }
  }

  @Post()
  async create(@Body() { menuId, tableId, quantity }: CreateOrderDto) {
    return await this.orderService.create(menuId, tableId, quantity);
  }

  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateOrderDto
  ) {
    await this.findOne(id);

    return await this.orderService.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    await this.findOne(id);

    return await this.orderService.remove({ where: { id } });
  }
}

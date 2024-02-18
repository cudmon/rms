import { Prisma } from "@prisma/client";
import { BillService } from "@/app/bill/bill.service";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";

@Controller("bill")
export class BillController {
  constructor(private readonly billService: BillService) {}

  @Get()
  async getBills() {
    return await this.billService.getBills();
  }

  @Get(":billId")
  async getBill(@Param("billId", ParseUUIDPipe) billId: string) {
    try {
      return await this.billService.getBill(billId);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException();
        }
      }
    }
  }

  @Post()
  async createBill(@Body("tableId", ParseUUIDPipe) tableId: string) {
    try {
      return await this.billService.createBill(tableId);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "NO_ACTIVE_USAGE") {
          throw new BadRequestException("No active usage");
        }

        if (e.message === "BILL_ALREADY_CREATED") {
          throw new BadRequestException("Bill already created");
        }
      }
    }
  }

  @Post(":billId/confirm")
  async confirmBill(@Param("billId", ParseUUIDPipe) billId: string) {
    await this.getBill(billId);

    try {
      return await this.billService.confirmBill(billId);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "BILL_ALREADY_CANCELLED") {
          throw new BadRequestException("Bill already cancelled");
        }
      }
    }
  }

  @Post(":billId/cancel")
  async cancelBill(@Param("billId", ParseUUIDPipe) billId: string) {
    await this.getBill(billId);

    try {
      return await this.billService.cancelBill(billId);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "BILL_ALREADY_CONFIRMED") {
          throw new BadRequestException("Bill already confirmed");
        }
      }
    }
  }
}

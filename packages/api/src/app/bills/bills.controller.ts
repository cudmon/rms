import { BillsService } from "@/app/bills/bills.service";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from "@nestjs/common";

@Controller("bills")
export class BillsController {
  constructor(private readonly billsService: BillsService) {}

  @Get()
  async findAll(params: { take?: number; skip?: number }) {
    return await this.billsService.findAll(params);
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    const bill = await this.billsService.findById(id);

    if (!bill) {
      throw new NotFoundException();
    }

    return bill;
  }

  @Post()
  async createBill(@Body("tableId", ParseUUIDPipe) tableId: string) {
    try {
      return await this.billsService.createBill(tableId);
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

  @Patch("/confirm/:id")
  async confirm(@Param("id", ParseUUIDPipe) id: string) {
    try {
      return await this.billsService.confirm(id);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "BILL_ALREADY_CANCELLED") {
          throw new BadRequestException("Bill already cancelled");
        }
      }
    }
  }

  @Patch("/cancel/:id")
  async cancel(@Param("id", ParseUUIDPipe) id: string) {
    try {
      return await this.billsService.cancel(id);
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "BILL_ALREADY_CONFIRMED") {
          throw new BadRequestException("Bill already confirmed");
        }
      }
    }
  }
}

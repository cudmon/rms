import { Prisma } from "@prisma/client";
import { UsageService } from "@/app/usage/usage.service";
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
} from "@nestjs/common";

@Controller("usages")
export class UsageController {
  constructor(private readonly usageService: UsageService) {}

  @Get()
  async getUsages() {
    return await this.usageService.getUsages();
  }

  @Get(":usageId")
  async getUsage(@Param("usageId", ParseUUIDPipe) usageId: string) {
    try {
      return await this.usageService.getUsage(usageId);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException();
        }
      }
    }
  }

  @Get("active/:tableId")
  async getActiveUsage(@Param("tableId", ParseUUIDPipe) tableId: string) {
    try {
      return await this.usageService.getActiveUsageWithOrders(tableId);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException();
        }
      }
    }
  }
}

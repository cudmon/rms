import { UsagesService } from "@/app/usages/usages.service";
import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Query,
} from "@nestjs/common";

@Controller("usages")
export class UsagesController {
  constructor(private readonly usagesService: UsagesService) {}

  @Get()
  async findAll(@Query() params: { take?: number; skip?: number }) {
    return await this.usagesService.findAll(params);
  }

  @Get(":id")
  async findById(@Param("id", ParseUUIDPipe) usageId: string) {
    const usage = await this.usagesService.findById(usageId);

    if (!usage) {
      throw new NotFoundException();
    }

    return usage;
  }

  @Get("active/:id")
  async findActive(@Param("id", ParseUUIDPipe) tableId: string) {
    const activeUsage = await this.usagesService.findActive(tableId);

    if (!activeUsage) {
      throw new NotFoundException();
    }

    return activeUsage;
  }
}

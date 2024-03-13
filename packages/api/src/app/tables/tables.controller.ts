import { TablesService } from "@/app/tables/tables.service";
import { Public } from "@/app/auth/decorators/public.decorator";
import { CreateTableDto, UpdateTableDto } from "@/app/tables/tables.dto";
import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Controller("tables")
export class TablesController {
  constructor(private readonly tableService: TablesService) {}

  @Public()
  @Get()
  async findAll(@Query("take") take?: number, @Query("skip") skip?: number) {
    return this.tableService.findAll({
      take,
      skip,
    });
  }

  @Get(":id")
  async findById(@Param("id", ParseUUIDPipe) id: string) {
    const table = await this.tableService.findById(id);

    if (!table) {
      throw new NotFoundException();
    }

    return table;
  }

  @Post()
  async create(@Body() data: CreateTableDto) {
    try {
      return await this.tableService.create(data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException();
        }
      }
    }
  }

  @Patch(":id")
  async updateById(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateTableDto
  ) {
    await this.findById(id);

    try {
      return this.tableService.updateById(id, data);
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new ConflictException();
        }
      }
    }
  }

  // IDLE
  // EATING
  // RESERVED

  @Patch("/idle/:id")
  async cancel(@Param("id", ParseUUIDPipe) id: string) {
    return await this.tableService.updateStatusById(id, "IDLE");
  }
  
  @Patch("/eating/:id")
  async eating(@Param("id", ParseUUIDPipe) id: string) {
    return await this.tableService.updateStatusById(id, "EATING");
  }

  @Patch("/reserved/:id")
  async reserved(@Param("id", ParseUUIDPipe) id: string) {
    return await this.tableService.updateStatusById(id, "RESERVED");
  }

  

  @Delete(":id")
  async deleteById(@Param("id", ParseUUIDPipe) id: string) {
    await this.findById(id);

    return this.tableService.deleteById(id);
  }
}

import { Prisma } from "@prisma/client";
import { TableService } from "@/app/table/table.service";
import { CreateTableDto, UpdateTableDto } from "@/app/table/table.dto";
import {
  Body,
  ConflictException,
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

@Controller("tables")
export class TableController {
  constructor(private readonly tableService: TableService) {}

  @Get()
  async findAll(
    @Query("take", new ParseIntPipe({ optional: true })) take?: number,
    @Query("skip", new ParseIntPipe({ optional: true })) skip?: number
  ) {
    return await this.tableService.findAll({
      take: take || 100,
      skip: skip || 0,
    });
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    try {
      return await this.tableService.findOne({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException();
        }
      }
    }
  }

  @Post()
  async create(@Body() data: CreateTableDto) {
    try {
      return await this.tableService.create({
        data: {
          ...data,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new ConflictException("Table with this name already exists.");
        }
      }
    }
  }

  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateTableDto
  ) {
    await this.findOne(id);

    try {
      return await this.tableService.update({
        where: { id },
        data: {
          ...data,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new ConflictException("Table with this name already exists.");
        }
      }
    }
  }

  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    await this.findOne(id);

    return await this.tableService.remove({ where: { id } });
  }
}

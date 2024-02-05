import { Prisma } from "@prisma/client";
import { MenuService } from "@/app/menu/menu.service";
import { createMenuSchema, updateMenuSchema } from "@/app/menu/menu.schema";
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

@Controller("menu")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(
    @Query("take", new ParseIntPipe({ optional: true })) take?: number,
    @Query("skip", new ParseIntPipe({ optional: true })) skip?: number
  ) {
    return await this.menuService.findAll({
      take: take || 100,
      skip: skip || 0,
    });
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    try {
      return await this.menuService.findOne({ id });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException();
        }
      }
    }
  }

  @Post()
  async create(@Body(createMenuSchema) data: Prisma.MenuCreateInput) {
    try {
      return await this.menuService.create(data);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new ConflictException();
        }
      }
    }
  }

  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body(updateMenuSchema) data: Prisma.MenuUpdateInput
  ) {
    await this.findOne(id);

    try {
      return await this.menuService.update({ id }, data);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new ConflictException();
        }
      }
    }
  }

  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    await this.findOne(id);

    return await this.menuService.remove({ id });
  }
}

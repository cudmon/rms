import { join } from "path";
import { Response } from "express";
import { createReadStream } from "fs";
import { Prisma } from "@prisma/client";
import { MenuService } from "@/app/menu/menu.service";
import { FileInterceptor } from "@nestjs/platform-express";
import { CreateMenuDto, UpdateMenuDto } from "@/app/menu/menu.dto";
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
  Res,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

@Controller("menus")
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  @Get()
  async findAll(@Query("take") take?: number, @Query("skip") skip?: number) {
    return await this.menuService.findAll({
      take: take || 100,
      skip: skip || 0,
    });
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    try {
      return await this.menuService.findOne({ where: { id } });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException();
        }
      }
    }
  }

  @Get(":id/image")
  async findImage(
    @Param("id", ParseUUIDPipe) id: string,
    @Res() res: Response
  ) {
    const menu = await this.findOne(id);
    const file = createReadStream(
      join(__dirname, "..", "..", "..", "uploads/menus", menu.image)
    );

    file.pipe(res);
  }

  @Post()
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @Body() data: CreateMenuDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    try {
      return await this.menuService.create({
        data: {
          ...data,
          image: image.filename,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new ConflictException("Menu with this name already exists.");
        }
      }
    }
  }

  @Patch(":id")
  @UseInterceptors(FileInterceptor("image"))
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateMenuDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    await this.findOne(id);

    try {
      return await this.menuService.update({
        where: { id },
        data: {
          ...data,
          image: image?.filename,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2002") {
          throw new ConflictException("Menu with this name already exists.");
        }
      }
    }
  }

  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    await this.findOne(id);

    return await this.menuService.remove({
      where: { id },
    });
  }
}

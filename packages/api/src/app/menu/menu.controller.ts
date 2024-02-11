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
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";

@Controller("menus")
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
  @UseInterceptors(FileInterceptor("image"))
  async create(
    @Body() data: CreateMenuDto,
    @UploadedFile() image: Express.Multer.File
  ) {
    try {
      return await this.menuService.create({
        ...data,
        image: image.filename,
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
      return await this.menuService.update(
        { id },
        {
          ...data,
          image: image?.filename,
        }
      );
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

    return await this.menuService.remove({ id });
  }
}

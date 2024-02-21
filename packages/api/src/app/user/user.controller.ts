import { Prisma } from "@prisma/client";
import { UserService } from "@/app/user/user.service";
import { CreateUserDto, UpdateUserDto } from "@/app/user/user.dto";
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

@Controller("users")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(
    @Query("take", new ParseIntPipe({ optional: true })) take?: number,
    @Query("skip", new ParseIntPipe({ optional: true })) skip?: number
  ) {
    return await this.userService.findAll({
      take: take || 100,
      skip: skip || 0,
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        email: true,
        telephone: true,
      },
    });
  }

  @Get(":id")
  async findOne(@Param("id", ParseUUIDPipe) id: string) {
    try {
      return await this.userService.findOne({
        where: { id },
        select: {
          id: true,
          username: true,
          name: true,
          role: true,
          email: true,
          telephone: true,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException();
        }
      }
    }
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
      return await this.userService.create({
        data,
        select: {
          id: true,
          username: true,
          name: true,
          role: true,
          email: true,
          telephone: true,
        },
      });
    } catch (e: any) {
      if (e.meta.target[0] === "username") {
        throw new ConflictException("This username is already used");
      } else if (e.meta.target[0] === "email") {
        throw new ConflictException("This email is already used");
      } else if (e.meta.target[0] === "telephone") {
        throw new ConflictException("This telephone is already used");
      }
    }
  }

  @Patch(":id")
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() data: UpdateUserDto
  ) {
    await this.userService.findOne({ where: { id } });
    try {
      return await this.userService.update(
        { id },
        { ...data },
        {
          id: true,
          username: true,
          name: true,
          role: true,
          email: true,
          telephone: true,
        }
      );
    } catch (e: any) {
      if (e.meta.target[0] === "username") {
        throw new ConflictException("This username is already used");
      } else if (e.meta.target[0] === "email") {
        throw new ConflictException("This email is already used");
      } else if (e.meta.target[0] === "telephone") {
        throw new ConflictException("This telephone is already used");
      }
    }
  }

  @Delete(":id")
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    await this.findOne(id);

    return await this.userService.delete({
      where: { id },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        email: true,
        telephone: true,
      },
    });
  }
}

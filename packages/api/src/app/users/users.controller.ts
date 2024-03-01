import { Prisma } from "@prisma/client";
import { UsersService } from "@/app/users/users.service";
import { CreateUserDto, UpdateUserDto } from "@/app/users/users.dto";
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

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll(@Query() params: { take?: number; skip?: number }) {
    return await this.usersService.findAll(params);
  }

  @Get(":id")
  async findById(@Param("id", ParseUUIDPipe) id: string) {
    const user = await this.usersService.findById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
      return await this.usersService.create(data);
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
    @Body() data: UpdateUserDto
  ) {
    const user = await this.usersService.updateById(id, data);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  @Delete(":id")
  async deleteById(@Param("id", ParseUUIDPipe) id: string) {
    const user = await this.usersService.deleteById(id);

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }
}

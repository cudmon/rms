import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({ take, skip }: Prisma.MenuFindManyArgs) {
    return await this.prisma.menu.findMany({ take, skip });
  }

  async findOne(where: Prisma.MenuWhereUniqueInput) {
    return await this.prisma.menu.findUniqueOrThrow({ where });
  }

  async create(data: Prisma.MenuCreateInput) {
    return await this.prisma.menu.create({ data });
  }

  async update(
    where: Prisma.MenuWhereUniqueInput,
    data: Prisma.MenuUpdateInput
  ) {
    return await this.prisma.menu.update({ where, data });
  }

  async remove(where: Prisma.MenuWhereUniqueInput) {
    return await this.prisma.menu.delete({ where });
  }
}

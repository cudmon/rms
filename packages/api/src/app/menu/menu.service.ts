import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class MenuService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(args: Prisma.MenuFindManyArgs) {
    return await this.prisma.menu.findMany(args);
  }

  async findOne(args: Prisma.MenuFindUniqueOrThrowArgs) {
    return await this.prisma.menu.findUniqueOrThrow(args);
  }

  async create(args: Prisma.MenuCreateArgs) {
    return await this.prisma.menu.create(args);
  }

  async update(args: Prisma.MenuUpdateArgs) {
    return await this.prisma.menu.update(args);
  }

  async remove(args: Prisma.MenuDeleteArgs) {
    return await this.prisma.menu.delete(args);
  }
}

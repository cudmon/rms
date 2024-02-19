import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(args: Prisma.TableFindManyArgs) {
    return await this.prisma.table.findMany(args);
  }

  async findOne(args: Prisma.TableFindUniqueOrThrowArgs) {
    return await this.prisma.table.findUniqueOrThrow(args);
  }

  async findFirst(args: Prisma.TableFindFirstArgs) {
    return await this.prisma.table.findFirst(args);
  }

  async create(args: Prisma.TableCreateArgs) {
    return await this.prisma.table.create(args);
  }

  async update(args: Prisma.TableUpdateArgs) {
    return await this.prisma.table.update(args);
  }

  async remove(args: Prisma.TableDeleteArgs) {
    return await this.prisma.table.delete(args);
  }

  async countReservedTables() {
    return await this.prisma.table.count({
      where: {
        status: "RESERVED",
      },
    });
  }
}

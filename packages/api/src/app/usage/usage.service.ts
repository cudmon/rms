import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class UsageService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(args: Prisma.UsageFindManyArgs) {
    return await this.prisma.usage.findMany(args);
  }

  async findOne(args: Prisma.UsageFindUniqueOrThrowArgs) {
    return await this.prisma.usage.findUniqueOrThrow(args);
  }

  async findFirst(args: Prisma.UsageFindFirstArgs) {
    return await this.prisma.usage.findFirst(args);
  }

  async create(args: Prisma.UsageCreateArgs) {
    return await this.prisma.usage.create(args);
  }

  async update(args: Prisma.UsageUpdateArgs) {
    return await this.prisma.usage.update(args);
  }

  async remove(args: Prisma.UsageDeleteArgs) {
    return await this.prisma.usage.delete(args);
  }
}

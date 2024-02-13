import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(args: Prisma.ReservationFindManyArgs) {
    return await this.prisma.reservation.findMany(args);
  }

  async findOne(args: Prisma.ReservationFindUniqueArgs) {
    return await this.prisma.reservation.findUnique(args);
  }

  async create({
    seat,
    userId,
    tableId,
  }: {
    seat: number;
    userId: string;
    tableId: string;
  }) {
    return await this.prisma.reservation.create({
      data: {
        seat,
        userId,
        tableId,
      },
    });
  }

  async update(args: Prisma.ReservationUpdateArgs) {
    return await this.prisma.reservation.update(args);
  }

  async delete(args: Prisma.ReservationDeleteArgs) {
    return await this.prisma.reservation.delete(args);
  }
}

import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}

  async getReservations(args?: Prisma.ReservationFindManyArgs) {
    return await this.prisma.reservation.findMany(args);
  }

  async getReservation(reservationId: string) {
    return await this.prisma.reservation.findUniqueOrThrow({
      where: {
        id: reservationId,
      },
    });
  }

  async makeReservation(
    when: Date,
    seat: number,
    userId: string,
    tableId: string
  ) {
    return await this.prisma.reservation.create({
      data: {
        seat,
        when,
        userId,
        tableId,
      },
    });
  }

  async cancelReservation(reservationId: string) {
    return await this.prisma.reservation.update({
      where: {
        id: reservationId,
      },
      data: {
        status: "CANCELED",
      },
    });
  }
}

import { Prisma } from "@prisma/client";
import { Injectable } from "@nestjs/common";
import { TableService } from "@/app/table/table.service";
import { PrismaService } from "@/providers/prisma.service";
import { SettingService } from "@/app/settings/setting.service";

@Injectable()
export class ReservationService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly settingService: SettingService,
    private readonly tableService: TableService
  ) {}

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

  private async getMaxReservation() {
    return Number(
      await this.settingService.getSettingByName("MAX_TABLE_BOOKING")
    );
  }

  private async isAllowReservation(userId: string) {
    return this.prisma.reservation.count({
      where: {
        userId,
        status: "CONFIRMED",
      },
    });
  }

  async makeReservation(
    when: string,
    seat: number,
    userId: string,
    tableId: string
  ) {
    const maxReservableTables = await this.getMaxReservation();
    const reservedTable = await this.tableService.countReservedTables();
    const maxDayReservation = await this.settingService.getSettingByName(
      "RESERVATION_MAX_DAY"
    );
    const minDayReservation = await this.settingService.getSettingByName(
      "RESERVATION_MIN_DAY"
    );

    const openingTime =
      await this.settingService.getSettingByName("OPENING_TIME");
    const closingTime =
      await this.settingService.getSettingByName("CLOSING_TIME");

    if (reservedTable >= maxReservableTables) {
      throw new Error("NO_TABLE_AVAILABLE");
    }

    if (
      new Date(when).getTime() - new Date().getTime() <
      Number(minDayReservation) * 24 * 60 * 60 * 1000
    ) {
      throw new Error("TOO_SOON");
    }

    if (
      new Date(when).getTime() - new Date().getTime() >
      Number(maxDayReservation) * 24 * 60 * 60 * 1000
    ) {
      throw new Error("TOO_FAR");
    }

    if (
      new Date(when).getHours() < Number(openingTime.value) ||
      new Date(when).getHours() > Number(closingTime.value)
    ) {
      throw new Error("OUT_OF_OPERATING_HOURS");
    }

    if ((await this.isAllowReservation(userId)) != 0) {
      throw new Error("MAX_RESERVATION_REACHED");
    }

    const re = await this.prisma.reservation.create({
      data: {
        seat,
        when: new Date(when),
        userId,
        tableId,
      },
    });

    await this.tableService.update({
      where: {
        id: tableId,
      },
      data: {
        status: "RESERVED",
      },
    });

    return re;
  }

  async cancelReservation(reservationId: string) {
    await this.tableService.update({
      where: {
        id: (await this.getReservation(reservationId)).tableId,
      },
      data: {
        status: "IDLE",
      },
    });

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

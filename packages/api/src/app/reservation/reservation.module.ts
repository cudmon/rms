import { Module } from "@nestjs/common";
import { TableService } from "@/app/table/table.service";
import { PrismaService } from "@/providers/prisma.service";
import { SettingService } from "@/app/settings/setting.service";
import { ReservationService } from "@/app/reservation/reservation.service";
import { ReservationController } from "@/app/reservation/reservation.controller";

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, SettingService, TableService, PrismaService],
})
export class ReservationModule {}

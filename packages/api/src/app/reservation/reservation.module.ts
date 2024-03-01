import { Module } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";
import { TablesService } from "@/app/tables/tables.service";
import { SettingService } from "@/app/settings/setting.service";
import { ReservationService } from "@/app/reservation/reservation.service";
import { ReservationController } from "@/app/reservation/reservation.controller";

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, SettingService, TablesService, PrismaService],
})
export class ReservationModule {}

import { Module } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";
import { TablesService } from "@/app/tables/tables.service";
import { SettingsService } from "@/app/settings/settings.service";
import { ReservationService } from "@/app/reservation/reservation.service";
import { ReservationController } from "@/app/reservation/reservation.controller";

@Module({
  controllers: [ReservationController],
  providers: [
    ReservationService,
    SettingsService,
    TablesService,
    PrismaService,
  ],
})
export class ReservationModule {}

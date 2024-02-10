import { Module } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";
import { ReservationService } from "@/app/reservation/reservation.service";
import { ReservationController } from "@/app/reservation/reservation.controller";

@Module({
  controllers: [ReservationController],
  providers: [ReservationService, PrismaService],
})
export class ReservationModule {}

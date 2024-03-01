import { Prisma } from "@prisma/client";
import { CurrentClient } from "@/app/auth/types/auth.type";
import { Client } from "@/app/auth/decorators/client.decorator";
import { MakeReservationDto } from "@/app/reservation/reservation.dto";
import { ReservationService } from "@/app/reservation/reservation.service";
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";

@Controller("reservations")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Get()
  async getReservations() {
    return this.reservationService.getReservations();
  }

  @Get(":reservationId")
  async getReservation(
    @Param("reservationId", ParseUUIDPipe) reservationId: string
  ) {
    try {
      return await this.reservationService.getReservation(reservationId);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === "P2025") {
          throw new NotFoundException("Reservation not found");
        }
      }
    }
  }

  @Post()
  async makeReservation(
    @Client() client: CurrentClient,
    @Body() { seat, when, tableId }: MakeReservationDto
  ) {
    try {
      return await this.reservationService.makeReservation(
        when,
        seat,
        client.id,
        tableId
      );
    } catch (e) {
      if (e instanceof Error) {
        if (e.message === "NO_TABLE_AVAILABLE") {
          throw new BadRequestException("Table not available");
        }

        if (e.message === "TOO_SOON") {
          throw new BadRequestException(
            "Reservation must be made at least 24 hour in advance"
          );
        }

        if (e.message === "TOO_FAR") {
          throw new BadRequestException(
            "Reservation must be made at most 30 days in advance"
          );
        }

        if (e.message === "OUT_OF_OPERATING_HOURS") {
          throw new BadRequestException(
            "Reservation must be made during operating hours"
          );
        }

        if (e.message === "MAX_RESERVATION_REACHED") {
          throw new BadRequestException(
            "You can only have 1 reservation at a time"
          );
        }
      }
    }
  }

  @Post(":reservationId/cancel")
  async cancelReservation(
    @Param("reservationId", ParseUUIDPipe) reservationId: string
  ) {
    await this.getReservation(reservationId);

    return await this.reservationService.cancelReservation(reservationId);
  }
}

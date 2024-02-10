import { ReservationService } from "@/app/reservation/reservation.service";
import { Controller } from "@nestjs/common";

@Controller("reservation")
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}
}

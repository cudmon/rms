import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class ReservationService {
  constructor(private readonly prisma: PrismaService) {}
}

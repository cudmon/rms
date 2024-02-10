import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class BillService {
  constructor(private readonly prisma: PrismaService) {}
}

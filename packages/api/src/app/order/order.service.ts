import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
}

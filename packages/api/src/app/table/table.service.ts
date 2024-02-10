import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class TableService {
  constructor(private readonly prisma: PrismaService) {}
}

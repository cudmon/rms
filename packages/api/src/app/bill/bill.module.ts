import { Module } from "@nestjs/common";
import { BillService } from "@/app/bill/bill.service";
import { PrismaService } from "@/providers/prisma.service";
import { BillController } from "@/app/bill/bill.controller";

@Module({
  controllers: [BillController],
  providers: [BillService, PrismaService],
})
export class BillModule {}

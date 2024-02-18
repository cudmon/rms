import { Module } from "@nestjs/common";
import { BillService } from "@/app/bill/bill.service";
import { UsageService } from "@/app/usage/usage.service";
import { PrismaService } from "@/providers/prisma.service";
import { BillController } from "@/app/bill/bill.controller";
import { SettingService } from "@/app/settings/setting.service";

@Module({
  controllers: [BillController],
  providers: [BillService, UsageService, SettingService, PrismaService],
})
export class BillModule {}

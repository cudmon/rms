import { Module } from "@nestjs/common";
import { BillsService } from "@/app/bills/bills.service";
import { PrismaService } from "@/providers/prisma.service";
import { TablesService } from "@/app/tables/tables.service";
import { UsagesService } from "@/app/usages/usages.service";
import { BillsController } from "@/app/bills/bills.controller";
import { SettingService } from "@/app/settings/setting.service";

@Module({
  controllers: [BillsController],
  providers: [
    BillsService,
    UsagesService,
    TablesService,
    SettingService,
    PrismaService,
  ],
})
export class BillsModule {}

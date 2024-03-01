import { Module } from "@nestjs/common";
import { TablesService } from "@/app/tables/tables.service";
import { PrismaService } from "@/providers/prisma.service";
import { TablesController } from "@/app/tables/tables.controller";

@Module({
  controllers: [TablesController],
  providers: [TablesService, PrismaService],
})
export class TablesModule {}

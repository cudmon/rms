import { Module } from "@nestjs/common";
import { UsagesService } from "@/app/usages/usages.service";
import { PrismaService } from "@/providers/prisma.service";
import { TablesService } from "@/app/tables/tables.service";
import { UsagesController } from "@/app/usages/usages.controller";

@Module({
  controllers: [UsagesController],
  providers: [UsagesService, TablesService, PrismaService],
})
export class UsagesModule {}

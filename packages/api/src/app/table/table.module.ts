import { Module } from "@nestjs/common";
import { TableService } from "@/app/table/table.service";
import { PrismaService } from "@/providers/prisma.service";
import { TableController } from "@/app/table/table.controller";

@Module({
  controllers: [TableController],
  providers: [TableService, PrismaService],
})
export class TableModule {}

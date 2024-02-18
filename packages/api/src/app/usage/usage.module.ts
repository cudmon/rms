import { Module } from "@nestjs/common";
import { UsageService } from "@/app/usage/usage.service";
import { PrismaService } from "@/providers/prisma.service";
import { UsageController } from "@/app/usage/usage.controller";

@Module({
  controllers: [UsageController],
  providers: [PrismaService, UsageService],
})
export class UsageModule {}

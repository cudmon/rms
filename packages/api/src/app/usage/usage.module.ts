import { Module } from "@nestjs/common";
import { UsageService } from "@/app/usage/usage.service";
import { PrismaService } from "@/providers/prisma.service";

@Module({
  providers: [PrismaService, UsageService],
})
export class UsageModule {}

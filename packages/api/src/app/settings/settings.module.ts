import { Module } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";
import { SettingsService } from "@/app/settings/settings.service";
import { SettingsController } from "@/app/settings/settings.controller";

@Module({
  controllers: [SettingsController],
  providers: [SettingsService, PrismaService],
})
export class SettingsModule {}

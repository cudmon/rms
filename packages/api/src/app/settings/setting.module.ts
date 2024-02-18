import { Module } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";
import { SettingService } from "@/app/settings/setting.service";
import { SettingController } from "@/app/settings/setting.controller";

@Module({
  controllers: [SettingController],
  providers: [SettingService, PrismaService],
})
export class SettingModule {}

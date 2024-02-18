import { SettingService } from "@/app/settings/setting.service";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
} from "@nestjs/common";

@Controller("settings")
export class SettingController {
  constructor(private readonly settingService: SettingService) {}

  @Get()
  async getSettings() {
    return this.settingService.getSettings();
  }

  @Get(":settingId")
  async getSettingById(@Param("settingId", ParseUUIDPipe) settingId: string) {
    return this.settingService.getSettingById(settingId);
  }

  @Post(":settingId")
  async updateSettingById(
    @Param("settingId", ParseUUIDPipe) settingId: string,
    @Body("value") value: string
  ) {
    return this.settingService.updateSettingById(settingId, value);
  }
}

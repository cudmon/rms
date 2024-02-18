import { Injectable } from "@nestjs/common";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class SettingService {
  constructor(private readonly prisma: PrismaService) {}

  async getSettings() {
    return this.prisma.setting.findMany();
  }

  async getSettingById(settingId: string) {
    return this.prisma.setting.findUniqueOrThrow({
      where: { id: settingId },
    });
  }

  async getSettingByName(name: string) {
    return this.prisma.setting.findUniqueOrThrow({
      where: {
        name,
      },
    });
  }

  async updateSettingById(settingId: string, value: string) {
    return this.prisma.setting.update({
      where: {
        id: settingId,
      },
      data: {
        value,
      },
    });
  }

  async updateSettingByName(name: string, value: string) {
    return this.prisma.setting.update({
      where: {
        name,
      },
      data: {
        value,
      },
    });
  }
}

import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/providers/prisma.service";
import { SettingsService } from "@/app/settings/settings.service";
import { SettingsController } from "@/app/settings/settings.controller";

describe("Settings Controller", () => {
  let service: SettingsService;
  let controller: SettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SettingsController],
      providers: [PrismaService, SettingsService],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
    controller = module.get<SettingsController>(SettingsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return settings", async () => {
    service.findAll = jest.fn().mockResolvedValue([]);

    const settings = await controller.findAll();

    expect(settings).toBeDefined();
  });

  it("should return settings by name", async () => {
    const data = {
      name: "HI",
      value: "01",
    };

    service.findByName = jest.fn().mockResolvedValue(data);

    const settings = await controller.findByName("HI");

    expect(settings).toEqual(data);
  });

  it("should update settings", async () => {
    const data = {
      name: "HI",
      value: "01",
    };

    service.updateByName = jest.fn().mockResolvedValue(data);

    const settings = await controller.updateByName("HI", "01");

    expect(settings).toEqual(data);
  });
});

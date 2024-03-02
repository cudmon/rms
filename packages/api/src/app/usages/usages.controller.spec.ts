import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/providers/prisma.service";
import { UsagesService } from "@/app/usages/usages.service";
import { TablesService } from "@/app/tables/tables.service";
import { UsagesController } from "@/app/usages/usages.controller";

describe("Usages Controller", () => {
  let service: UsagesService;
  let controller: UsagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsagesController],
      providers: [UsagesService, PrismaService, TablesService],
    }).compile();

    service = module.get<UsagesService>(UsagesService);
    controller = module.get<UsagesController>(UsagesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return an array of usages", async () => {
    service.findAll = jest.fn().mockResolvedValue([]);

    const usages = await controller.findAll(10, 0);

    expect(usages).toEqual([]);
  });

  it("should return a usage", async () => {
    service.findById = jest.fn().mockResolvedValue({ id: "1" });

    const usage = await controller.findById("1");

    expect(usage).toEqual({ id: "1" });
  });

  it("should return an active usage", async () => {
    service.findActive = jest.fn().mockResolvedValue({ id: "1" });

    const usage = await controller.findActive("1");

    expect(usage).toEqual({ id: "1" });
  });
});

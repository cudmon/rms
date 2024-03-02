import { Test, TestingModule } from "@nestjs/testing";
import { BillsService } from "@/app/bills/bills.service";
import { PrismaService } from "@/providers/prisma.service";
import { UsagesService } from "@/app/usages/usages.service";
import { TablesService } from "@/app/tables/tables.service";
import { BillsController } from "@/app/bills/bills.controller";
import { SettingsService } from "@/app/settings/settings.service";

describe("Bills Controller", () => {
  let service: BillsService;
  let controller: BillsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillsController],
      providers: [
        PrismaService,
        BillsService,
        UsagesService,
        TablesService,
        SettingsService,
      ],
    }).compile();

    service = module.get<BillsService>(BillsService);
    controller = module.get<BillsController>(BillsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return an array of bills", async () => {
    const result = [
      {
        id: "1",
        usageId: "1",
        price: 100,
      },
    ];

    service.findAll = jest.fn().mockResolvedValue(result);

    const bills = await controller.findAll();

    expect(bills).toBe(result);
  });

  it("should return a bill", async () => {
    const result = {
      id: "1",
      usageId: "1",
      price: 100,
    };

    service.findById = jest.fn().mockResolvedValue(result);

    const bill = await controller.findById("1");

    expect(bill).toBe(result);
  });

  it("should create a bill", async () => {
    const result = {
      id: "1",
      usageId: "1",
      price: 100,
    };

    service.createBill = jest.fn().mockResolvedValue(result);

    const bill = await controller.createBill("1");

    expect(bill).toBe(result);
  });

  it("should confirm a bill", async () => {
    const result = {
      id: "1",
      usageId: "1",
      price: 100,
    };

    service.findById = jest.fn().mockResolvedValue(result);
    service.confirm = jest.fn().mockResolvedValue(result);

    const bill = await controller.confirm("1");

    expect(bill).toBe(result);
  });

  it("should cancel a bill", async () => {
    const result = {
      id: "1",
      usageId: "1",
      price: 100,
    };

    service.findById = jest.fn().mockResolvedValue(result);
    service.cancel = jest.fn().mockResolvedValue(result);

    const bill = await controller.cancel("1");

    expect(bill).toBe(result);
  });
});

import { Test, TestingModule } from "@nestjs/testing";
import { PrismaService } from "@/providers/prisma.service";
import { TablesService } from "@/app/tables/tables.service";
import { TablesController } from "@/app/tables/tables.controller";

describe("Tables Controller", () => {
  let service: TablesService;
  let controller: TablesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablesController],
      providers: [PrismaService, TablesService],
    }).compile();

    service = module.get<TablesService>(TablesService);
    controller = module.get<TablesController>(TablesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return an array of tables", async () => {
    const result = [
      {
        id: 1,
        name: "Table 1",
        capacity: 4,
        status: "AVAILABLE",
      },
      {
        id: 2,
        name: "Table 2",
        capacity: 4,
        status: "AVAILABLE",
      },
    ];

    service.findAll = jest.fn().mockResolvedValue(result);

    const tables = await controller.findAll();

    expect(tables).toBe(result);
  });

  it("should return a table", async () => {
    const result = {
      id: "1",
      name: "Table 1",
      capacity: 4,
      status: "AVAILABLE",
    };

    service.findById = jest.fn().mockResolvedValue(result);

    const table = await controller.findById("1");

    expect(table).toBe(result);
  });

  it("should create a table", async () => {
    const result = {
      id: "1",
      name: "Table 1",
      capacity: 4,
      status: "IDLE",
      seat: 4,
      passcode: "123456",
    };

    service.create = jest.fn().mockResolvedValue(result);

    const table = await controller.create(result);

    expect(table).toBe(result);
  });

  it("should update a table", async () => {
    const result = {
      id: "1",
      name: "Table 1",
      capacity: 4,
      status: "IDLE",
      seat: 4,
      passcode: "123456",
    };

    service.findById = jest.fn().mockResolvedValue(result);
    service.updateById = jest.fn().mockResolvedValue(result);

    const table = await controller.updateById("1", result);

    expect(table).toBe(result);
  });

  it("should delete a table", async () => {
    const result = {
      id: "1",
      name: "Table 1",
      capacity: 4,
      status: "IDLE",
      seat: 4,
      passcode: "123456",
    };

    service.findById = jest.fn().mockResolvedValue(result);
    service.deleteById = jest.fn().mockResolvedValue(result);

    const table = await controller.deleteById("1");

    expect(table).toBe(result);
  });
});

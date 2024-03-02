import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "@/app/users/users.service";
import { PrismaService } from "@/providers/prisma.service";
import { UsersController } from "@/app/users/users.controller";

describe("Users Controller", () => {
  let service: UsersService;
  let controller: UsersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    service = module.get<UsersService>(UsersService);
    controller = module.get<UsersController>(UsersController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return an array of users", async () => {
    service.findAll = jest.fn().mockResolvedValue([]);

    const users = await controller.findAll(10, 0);

    expect(users).toEqual([]);
  });

  it("should return a user", async () => {
    service.findById = jest.fn().mockResolvedValue({ id: "1" });

    const user = await controller.findById("1");

    expect(user).toEqual({ id: "1" });
  });

  it("should create a user", async () => {
    const data = {
      username: "test",
      password: "test",
      email: "test@test.com",
      name: "test",
      telephone: "test",
    };

    service.create = jest.fn().mockResolvedValue(data);

    const user = await controller.create(data);

    expect(user).toMatchObject(data);
  });

  it("should update a user", async () => {
    const data = [
      {
        id: "1",
        username: "tester",
        email: "tester@tester.com",
        name: "tester",
        password: "test",
        telephone: "0000000000",
        role: "MANAGER",
      },
      {
        id: "2",
        username: "admin",
        password: "admin",
        email: "admin@admin.com",
        name: "admin",
        telephone: "0000000000",
        role: "MANAGER",
      },
    ];

    service.findById = jest.fn().mockResolvedValue(data[0]);
    service.updateById = jest.fn().mockResolvedValue(data);

    const user = await controller.updateById("1", {
      username: "tester",
      email: "tester@tester.com",
      name: "tester",
    });

    expect(user).toMatchObject(data);
  });

  it("should delete a user", async () => {
    service.findById = jest.fn().mockResolvedValue({ id: "1" });
    service.deleteById = jest.fn().mockResolvedValue({ id: "1" });

    const user = await controller.deleteById("1");

    expect(user).toEqual({ id: "1" });
  });
});

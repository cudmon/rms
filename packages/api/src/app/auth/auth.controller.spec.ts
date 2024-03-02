import { JwtService } from "@nestjs/jwt";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "@/app/auth/auth.service";
import { UsersService } from "@/app/users/users.service";
import { PrismaService } from "@/providers/prisma.service";
import { AuthController } from "@/app/auth/auth.controller";
import { TablesService } from "@/app/tables/tables.service";

describe("Auth Controller", () => {
  let service: AuthService;
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        PrismaService,
        AuthService,
        UsersService,
        TablesService,
        JwtService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    controller = module.get<AuthController>(AuthController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("should return a token for user", async () => {
    service.logIn = jest.fn().mockResolvedValue({ token: "token" });

    const token = await controller.logIn({
      username: "test",
      password: "test",
    });

    expect(token).toHaveProperty("token");
  });

  it("should return a token for table", async () => {
    service.tableLogin = jest.fn().mockResolvedValue({ token: "token" });

    const token = await controller.tableLogin({
      id: "1",
      passcode: "test",
    });

    expect(token).toHaveProperty("token");
  });

  it("should return a user", async () => {
    service.register = jest.fn().mockResolvedValue({ id: 1 });

    const user = await controller.register({
      username: "test",
      password: "test",
      email: "test",
      telephone: "0000000000",
      name: "test",
    });

    expect(user).toHaveProperty("id");
  });
});

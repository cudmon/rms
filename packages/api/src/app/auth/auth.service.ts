import { compare, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import {
  Injectable,
} from "@nestjs/common";
import { UsersService } from "@/app/users/users.service";
import { TablesService } from "@/app/tables/tables.service";
import {
  ChangePasswordDto,
  LogInDto,
  RegisterDto,
  TableLoginDto,
} from "@/app/auth/auth.dto";
import { PrismaService } from "@/providers/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tablesService: TablesService,
    private prisma: PrismaService
  ) {}

  async checkSession(token: string) {
    await this.jwtService.verifyAsync(token);
  }

  async tableLogin({ id, passcode }: TableLoginDto) {
    const table = await this.tablesService.findByIdIncludePasscode(id);

    if (!(await compare(passcode, table.passcode)) || !table) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const payload = { id: table.id, role: "TABLE" };

    return {
      id: table.id,
      name: table.name,
      seat: table.seat,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async logIn({ username, password }: LogInDto) {
    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const match = await compare(password, user.password);

    if (!match) {
      throw new Error("INVALID_CREDENTIALS");
    }

    const payload = { id: user.id, role: user.role };

    return {
      ...user,
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: RegisterDto) {
    return await this.usersService.create(data);
  }

  async changePassword(id: string, data: ChangePasswordDto) {
    const user = await this.usersService.findById(id);
    if (!user) {
      throw new Error("INVALID_CREDENTIALS");
    }
    const match = await compare(data.password, user.password);

    if (!match) {
      throw new Error("NOT_MATCH");
    }
    console.log(data.newPassword);
    return await this.prisma.user.update({
      where: {
        id,
      },
      data: { password: await hash(data.newPassword, 10)},
      select: {
        id: true,
        username: true,
        password: true,
      },
    });
  }
}

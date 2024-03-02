import { compare, hash } from "bcrypt";
import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { UsersService } from "@/app/users/users.service";
import { TablesService } from "@/app/tables/tables.service";
import { LogInDto, RegisterDto, TableLoginDto } from "@/app/auth/auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private usersService: UsersService,
    private tablesService: TablesService
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
      token: await this.jwtService.signAsync(payload),
    };
  }

  async register(data: RegisterDto) {
    try {
      return await this.usersService.create({
        ...data,
        password: await hash(data.password, 10),
      });
    } catch (error) {}
  }
}

import { AuthService } from "@/app/auth/auth.service";
import { Public } from "./decorators/public.decorator";
import { UsersService } from "@/app/users/users.service";
import { CurrentClient } from "@/app/auth/types/auth.type";
import { LogInDto, RegisterDto, TableLoginDto } from "@/app/auth/auth.dto";
import { Client } from "@/app/auth/decorators/client.decorator";
import {
  Body,
  Controller,
  Post,
  Get,
  UnauthorizedException,
} from "@nestjs/common";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Get("profile")
  async profile(@Client() user: CurrentClient) {
    return this.usersService.findById(user.id);
  }

  @Public()
  @Post("table-login")
  async tableLogin(@Body() data: TableLoginDto) {
    try {
      return await this.authService.tableLogin(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "INVALID_CREDENTIALS") {
          throw new UnauthorizedException("INVALID_CREDENTIALS");
        }
      }
    }
  }

  @Public()
  @Post("login")
  async logIn(@Body() data: LogInDto) {
    try {
      return await this.authService.logIn(data);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === "INVALID_CREDENTIALS") {
          throw new UnauthorizedException("INVALID_CREDENTIALS");
        }
      }
    }
  }

  @Public()
  @Post("register")
  async register(@Body() data: RegisterDto) {
    return await this.authService.register(data);
  }
}

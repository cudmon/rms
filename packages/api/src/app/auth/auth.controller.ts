import { AuthService } from "@/app/auth/auth.service";
import { Public } from "./decorators/public.decorator";
import { UsersService } from "@/app/users/users.service";
import { CurrentClient } from "@/app/auth/types/auth.type";
import { Client } from "@/app/auth/decorators/client.decorator";
import { LogInDto, RegisterDto, TableLoginDto } from "@/app/auth/auth.dto";
import {
  Body,
  Controller,
  Post,
  Get,
  UnauthorizedException,
  Headers,
} from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

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

  @Get("check-session")
  async checkSession(@Headers("Authorization") authorization: string) {
    const token = authorization?.split(" ")[1];

    if (!token) {
      throw new UnauthorizedException("INVALID_SESSION");
    }

    try {
      await this.authService.checkSession(token);

      return {
        message: "valid session",
      };
    } catch (e) {
      throw new UnauthorizedException("INVALID_SESSION");
    }
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
    try {
      return await this.authService.register(data);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === "P2002") {
          throw new UnauthorizedException("Already used information");
        }
      }
    }
  }
}

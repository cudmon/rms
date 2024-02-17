import {
  Body,
  Controller,
  Post,
  Get,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { Auth, Public } from "./auth.decorator";
import { LogInDto, RegisterDto } from "./auth.dto";
import { UserService } from "../user/user.service";
import { IAuth } from "./auth.type";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {}

  @Get("profile")
  getProfile(@Auth() user: IAuth) {
    return this.userService.findOne({
      where: { id: user.id },
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        email: true,
        telephone: true,
      },
    });
  }

  @Post("login")
  @Public()
  async logIn(@Body() data: LogInDto) {
    const success = await this.authService.logIn(data.username, data.password);
    if (!success) {
      return new UnauthorizedException("");
    }
    return success;
  }

  @Public()
  @Post("register")
  register(@Body() data: RegisterDto) {
    return this.authService.register({
      data,
      select: {
        id: true,
        username: true,
        name: true,
        role: true,
        email: true,
        telephone: true,
      },
    });
  }
}

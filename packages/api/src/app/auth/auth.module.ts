import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";
import { jwtConstants } from "./auth.constant";
import { UserModule } from "../user/user.module";
import { AuthController } from "./auth.controller";
import { PrismaService } from "@/providers/prisma.service";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "600s" },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    AuthService,
    PrismaService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

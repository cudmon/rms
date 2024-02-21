import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthGuard } from "@/app/auth/auth.guard";
import { UserModule } from "@/app/user/user.module";
import { AuthService } from "@/app/auth/auth.service";
import { PrismaService } from "@/providers/prisma.service";
import { AuthController } from "@/app/auth/auth.controller";

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: "1d",
      },
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

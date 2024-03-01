import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AuthService } from "@/app/auth/auth.service";
import { UsersService } from "@/app/users/users.service";
import { AuthGuard } from "@/app/auth/guards/auth.guard";
import { PrismaService } from "@/providers/prisma.service";
import { AuthController } from "@/app/auth/auth.controller";
import { TablesService } from "@/app/tables/tables.service";

@Module({
  exports: [AuthService],
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      signOptions: {
        expiresIn: "1d",
      },
    }),
  ],
  providers: [
    AuthService,
    UsersService,
    TablesService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}

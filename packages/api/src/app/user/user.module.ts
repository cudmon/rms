import { Module } from "@nestjs/common";
import { UserService } from "@/app/user/user.service";
import { PrismaService } from "@/providers/prisma.service";
import { UserController } from "@/app/user/user.controller";

@Module({
  controllers: [UserController],
  providers: [UserService, PrismaService],
})
export class UserModule {}

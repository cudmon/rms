import { Module } from "@nestjs/common";
import { UsersService } from "@/app/users/users.service";
import { PrismaService } from "@/providers/prisma.service";
import { UsersController } from "@/app/users/users.controller";

@Module({
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class UsersModule {}

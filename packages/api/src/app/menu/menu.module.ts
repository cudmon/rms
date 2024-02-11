import { Module } from "@nestjs/common";
import { MenuService } from "@/app/menu/menu.service";
import { MulterModule } from "@nestjs/platform-express";
import { PrismaService } from "@/providers/prisma.service";
import { MenuController } from "@/app/menu/menu.controller";

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
  imports: [
    MulterModule.register({
      dest: "./uploads/menus",
    }),
  ],
})
export class MenuModule {}

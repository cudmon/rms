import { Module } from "@nestjs/common";
import { MenuService } from "@/app/menu/menu.service";
import { PrismaService } from "@/providers/prisma.service";
import { MenuController } from "@/app/menu/menu.controller";

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
})
export class MenuModule {}

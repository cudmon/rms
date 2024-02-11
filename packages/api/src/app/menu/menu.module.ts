import { MenuService } from "@/app/menu/menu.service";
import { MulterModule } from "@nestjs/platform-express";
import { PrismaService } from "@/providers/prisma.service";
import { MenuController } from "@/app/menu/menu.controller";
import { BadRequestException, Module } from "@nestjs/common";

@Module({
  controllers: [MenuController],
  providers: [MenuService, PrismaService],
  imports: [
    MulterModule.register({
      dest: "./uploads/menus",
      limits: {
        fileSize: 1024 * 1024 * 5,
      },
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
          return cb(
            new BadRequestException("Only image files are allowed!"),
            false
          );
        }

        cb(null, true);
      },
    }),
  ],
})
export class MenuModule {}

import { Module } from "@nestjs/common";
import { MenuModule } from "@/app/menu/menu.module";

@Module({
  imports: [MenuModule],
})
export class AppModule {}

import { Module } from "@nestjs/common";
import { MenuModule } from "@/app/menu/menu.module";
import { UserModule } from "./app/user/user.module";

@Module({
  imports: [MenuModule, UserModule],
})
export class AppModule {}

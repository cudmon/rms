import { Module } from "@nestjs/common";
import { MenuModule } from "@/app/menu/menu.module";
import { UserModule } from "./app/user/user.module";
import { AuthModule } from "./app/auth/auth.module";

@Module({
  imports: [MenuModule, UserModule, AuthModule],
});

export class AppModule {}
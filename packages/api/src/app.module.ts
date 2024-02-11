import { Module } from "@nestjs/common";
import { MenuModule } from "@/app/menu/menu.module";
import { ServeStaticModule } from "@nestjs/serve-static";

@Module({
  imports: [
    MenuModule,
    ServeStaticModule.forRoot({
      rootPath: `${__dirname}/../uploads`,
      serveRoot: "/contents",
    }),
  ],
})
export class AppModule {}

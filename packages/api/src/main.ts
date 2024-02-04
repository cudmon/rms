import { AppModule } from "@/app.module";
import { NestFactory } from "@nestjs/core";
import { ZodFilter } from "@/exceptions/zod.exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.getHttpAdapter().getInstance().set("etag", false);
  app.getHttpAdapter().getInstance().disable("x-powered-by");

  app.useGlobalFilters(new ZodFilter());

  await app.listen(5000);
}

bootstrap();

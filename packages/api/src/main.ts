import { AppModule } from "@/app.module";
import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { HttpExceptionFilter } from "@/exceptions/http.exception";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.getHttpAdapter().getInstance().set("etag", false);
  app.getHttpAdapter().getInstance().disable("x-powered-by");

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(5000);
}

bootstrap();

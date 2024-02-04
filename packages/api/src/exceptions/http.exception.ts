import { Response } from "express";
import {
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from "@nestjs/common";

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      error: {
        code: status,
        message: exception.message,
      },
    });
  }
}

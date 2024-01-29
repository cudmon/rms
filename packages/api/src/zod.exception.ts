import { ZodError } from "zod";
import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const status = 400;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(status).json({
      errors: exception.errors,
      message: exception.message,
      statusCode: status,
    });
  }
}

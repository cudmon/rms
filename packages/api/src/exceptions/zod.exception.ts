import { ZodError } from "zod";
import { Catch, ExceptionFilter, ArgumentsHost } from "@nestjs/common";

@Catch(ZodError)
export class ZodFilter<T extends ZodError> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const status = 400;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    response.status(status).json({
      errors: exception.errors.map((error) => {
        const field = error.path.join(".");
        const message = error.message.split(" ").slice(1).join(" ");

        return `\`${field}\` ${message}`;
      }),
      statusCode: status,
    });
  }
}

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  constructor(
    private httpAdapterHost: HttpAdapterHost,
    private configService: ConfigService,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    this.logger.error(
      `Exception: ${exception.message}, stack: ${exception.stack}`,
    );

    const isProduction =
      this.configService.get<string>('NODE_ENV') === 'production';

    const responseBody = isProduction
      ? {
          statusCode: httpStatus,
          timestamp: new Date().toISOString(),
          message: exception.message,
        }
      : {
          statusCode: httpStatus,
          timestamp: new Date().toISOString(),
          message: exception.message,
          stacktrace: exception.stack,
        };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

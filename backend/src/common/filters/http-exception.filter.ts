import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from '@prisma/client';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    let status = 500;
    let message = 'Error interno del servidor';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();
      message = typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as any).message || exception.message;
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      if (exception.code === 'P2025') {
        status = 404;
        message = 'Registro no encontrado';
      } else if (exception.code === 'P2002') {
        status = 409;
        message = 'El registro ya existe';
      }
    }

    if (status >= 500) {
      this.logger.error('Unhandled request error', exception instanceof Error ? exception.stack : undefined);
    }

    response.status(status).json({
      statusCode: status,
      message,
      data: null,
      path: request.url,
      timestamp: new Date().toISOString(),
    });
  }
}

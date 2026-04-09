import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  ValidationException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(ValidationException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errors = this.formatValidationErrors(exception);

    response.status(400).json({
      statusCode: 400,
      message: 'Validation failed',
      error: 'Bad Request',
      errors,
    });
  }

  private formatValidationErrors(exception: ValidationException) {
    const response = exception.getResponse();
    if (typeof response === 'object' && 'message' in response) {
      const messages = (response as any).message;
      if (Array.isArray(messages)) {
        return messages;
      }
    }
    return [exception.message];
  }
}

import { ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Request, Response } from 'express';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const errorMessage = this.catchPrismaError(exception);

    response
      .status(HttpStatus.BAD_REQUEST)
      .json({
        status: HttpStatus.BAD_REQUEST,
        message: errorMessage
      });      
  }

  catchPrismaError(exception: PrismaClientKnownRequestError){
    switch(exception.code){
      case "P2002": return `This ${exception.meta.target} is already in use`;
      default: return "Internal server error"
    }
  }
}
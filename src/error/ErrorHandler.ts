import { Response } from 'express';
const LOGGING = true;

interface ErrorResponse {
  statusCode: number;
  message: string;
}

const ErrorNameCode = {
  QueryFailedError: 400,
  UnauthorizedError: 401,
}

// Singleton
export class ErrorHandler {
  private static instance: ErrorHandler;

  private constructor() { }

  static getInstance(): ErrorHandler {
    if (!ErrorHandler.instance) {
      ErrorHandler.instance = new ErrorHandler();
    }
    return ErrorHandler.instance;
  }

  public handleError(e: Error): ErrorResponse {
    LOGGING && console.log(e.name);
    return {
      statusCode: ErrorNameCode[e.name] || 500,
      message: e.message
    }
  }

  public sendErrorResponse(errorResponse: ErrorResponse, res: Response) {
    res.status(errorResponse.statusCode);
    res.send({ message: errorResponse.message });
  }

}

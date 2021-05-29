import { Response } from 'express';
import { LOGGING } from '../config';
import { EntityAlreadyExistsError } from './errors/EntityAlreadyExistsError';
import { EntityNotFoundError } from './errors/EntityNotFoundError';
import { InvalidEntityError } from './errors/InvalidEntityError';
import { UnauthorizedError } from './errors/UnauthorizedError';

interface ErrorResponse {
  statusCode: number;
  message: string;
}

const ErrorNameCode = {
  [UnauthorizedError.name]: 401,
  NotExistingPropertyError: 400,
  NotValidPropertyTypeError: 400,
  [InvalidEntityError.name]: 400,
  [EntityAlreadyExistsError.name]: 400,
  [EntityNotFoundError.name]: 400,
  Error: 500,
}

export class ErrorHandler {

  public static handleError(e: Error): ErrorResponse {
    LOGGING && console.log(`${e.name}: ${e.message}`);
    return {
      statusCode: ErrorNameCode[e.name] || 500,
      message: e.message
    }
  }

  public static sendErrorResponse(errorResponse: ErrorResponse, res: Response) {
    res.status(errorResponse.statusCode);
    res.send({ message: errorResponse.message });
  }

}

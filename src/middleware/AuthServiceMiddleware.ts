import Axios from "axios";
import { NextFunction, Request, Response } from "express";
import { RemoteServicesInfo } from "../config";
import { UnauthorizedError } from "../error/errors/UnauthorizedError";
import { ErrorHandler } from "../error/ErrorHandler";
import { Socket } from "socket.io";

interface TokenQuery {
  token: string;
}

const { API_URL, ROUTE } = RemoteServicesInfo.AuthService;

export function AuthServiceMiddleware(roles: string[]): Function {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request && request.headers && request.headers.authorization || "";
    if (API_URL) {
      validateToken(token, roles, next, () => {
        const errorHandler = ErrorHandler.getInstance();
        const errorResponse = errorHandler.handleError(new UnauthorizedError("Invalid token."));
        errorHandler.sendErrorResponse(errorResponse, response);
      });
    } else {
      next();
    }
  }
}

export function SocketAuthServiceMiddleware(roles: string[]) {
  return (socket: Socket, next: Function) => {
    if (API_URL) {
      const query = socket.handshake.query as TokenQuery;
      const token: string = query.token || "";

      validateToken(token, roles, next, () => {
        next(new UnauthorizedError("Invalid token."));
      });
    } else {
      next();
    }
  }
};

function validateToken(token: string, roles: string[], onSuccess: Function, onError: Function): void {
  Axios.post(`${API_URL}${ROUTE}`, { roles }, {
    headers: {
      'Authorization': token
    }
  })
  .then(() => {
    onSuccess();
  })
  .catch(() => {
    onError();
  });
}
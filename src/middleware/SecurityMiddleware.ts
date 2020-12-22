import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../error/errors/UnauthorizedError";
import { ErrorHandler } from "../error/ErrorHandler";
import { Socket } from "socket.io";
import { IAuthService } from "../contracts/services/proxy/IAuthService";
import { IUserService } from "../contracts/services/proxy/IUserService";
import { CONFIGURATION } from "../config";
import { AppContainer } from "../container/container";

interface TokenQuery {
  token: string;
}

export function AuthorizationMiddleware(roles: string[]): Function {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request && request.headers && request.headers.authorization || "";

    CONFIGURATION.PRODUCTION ? validateToken(token, roles, next, () => {
      const errorHandler = ErrorHandler.getInstance();
      const errorResponse = errorHandler.handleError(new UnauthorizedError("Invalid token."));
      errorHandler.sendErrorResponse(errorResponse, response);
    })
    :
    next();
  }
}

export function SocketUserGroupSpecificMiddleware(userGroupId: string, roles: string[]) {
  return (socket: Socket, next: Function) => {
    const query = socket.handshake.query as TokenQuery;
    const token: string = query.token || "";

    CONFIGURATION.PRODUCTION ? validateTokenUserGroup(token, userGroupId, roles, next, () => {
      next(new UnauthorizedError("Account is not part of the provided group."));
    })
    :
    next();
  }
};

function validateToken(token: string, roles: string[], onSuccess: Function, onError: Function): void {
  const authService: IAuthService = AppContainer.get<IAuthService>("IAuthService");

  authService.validateToken(token, roles)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });

}

function validateTokenUserGroup(token: string, userGroupId: string, roles: string[], onSuccess: Function, onError: Function): void {
  const userService: IUserService = AppContainer.get<IUserService>("IUserService");

  userService.validateTokenUserGroup(token, userGroupId, roles)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });

}
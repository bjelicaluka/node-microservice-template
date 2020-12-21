import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../error/errors/UnauthorizedError";
import { ErrorHandler } from "../error/ErrorHandler";
import { Socket } from "socket.io";
import { IAuthService } from "../contracts/Services/IAuthService";
import { AuthServiceProxy } from "../services/proxy/AuthServiceProxy";
import { IUserService } from "../contracts/Services/IUserService";
import { UserServiceProxy } from "../services/proxy/UserServiceProxy";
import { CONFIGURATION } from "../config";

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
  const authService: IAuthService = AuthServiceProxy.getInstance();

  authService.validateToken(token, roles)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });

}

function validateTokenUserGroup(token: string, userGroupId: string, roles: string[], onSuccess: Function, onError: Function): void {
  const userService: IUserService = UserServiceProxy.getInstance();

  userService.validateTokenUserGroup(token, userGroupId, roles)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });

}
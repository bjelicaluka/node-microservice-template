import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../error/errors/UnauthorizedError";
import { ErrorHandler } from "../error/ErrorHandler";
import { Socket } from "socket.io";
import { IAuthService } from "../contracts/Services/IAuthService";
import { AuthServiceProxy } from "../services/proxy/AuthServiceProxy";
import { IUserService } from "../contracts/Services/IUserService";
import { UserServiceProxy } from "../services/proxy/UserServiceProxy";

interface TokenQuery {
  token: string;
}

export function AuthorizationMiddleware(roles: string[]): Function {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request && request.headers && request.headers.authorization || "";

    validateToken(token, roles, next, () => {
      const errorHandler = ErrorHandler.getInstance();
      const errorResponse = errorHandler.handleError(new UnauthorizedError("Invalid token."));
      errorHandler.sendErrorResponse(errorResponse, response);
    });
  }
}

export function SocketAuthorizationMiddleware(roles: string[]) {
  return (socket: Socket, next: Function) => {
    const query = socket.handshake.query as TokenQuery;
    const token: string = query.token || "";

    validateToken(token, roles, next, () => {
      next(new UnauthorizedError("Invalid token."));
    });
  }
};

export function SocketUserGroupSpecificMiddleware(userGroupId: string) {
  return (socket: Socket, next: Function) => {
    const query = socket.handshake.query as TokenQuery;
    const token: string = query.token || "";

    validateTokenUserGroup(token, userGroupId, next, () => {
      next(new UnauthorizedError("Account is not part of the provided group."));
    });
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

function validateTokenUserGroup(token: string, userGroupId: string, onSuccess: Function, onError: Function): void {
  const userService: IUserService = UserServiceProxy.getInstance();

  userService.validateTokenUserGroup(token, userGroupId)
    .then(() => {
      onSuccess();
    })
    .catch(() => {
      onError();
    });

}
import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../error/errors/UnauthorizedError";
import { ErrorHandler } from "../error/ErrorHandler";
import { Socket } from "socket.io";
import { CONFIGURATION, JWT_SECRET } from "../config";
import { AppContainer } from "../AppContainer";
import * as jwt from 'jsonwebtoken';
import { IUserService } from "../services/contracts/proxy/IUserService";

interface TokenQuery {
  token: string;
}

export function AuthorizationMiddleware(roles: string[]): Function {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request?.headers?.authorization || "";

    CONFIGURATION.PRODUCTION ? validateToken(token, roles, next, () => {
      const errorResponse = ErrorHandler.handleError(new UnauthorizedError("Invalid token."));
      ErrorHandler.sendErrorResponse(errorResponse, response);
    })
    :
    next();
  }
}

export function UserGroupSpecificMiddleware(roles: string[]) {
  return (request: Request, response: Response, next: NextFunction) => {
    const token = request?.headers?.authorization || "";
    const userGroupId: string = request?.params?.userGroupId;

    CONFIGURATION.PRODUCTION ? validateTokenUserGroup(token, userGroupId, roles, next, () => {
      const errorResponse = ErrorHandler.handleError(new UnauthorizedError("Invalid token for the given user group id."));
      ErrorHandler.sendErrorResponse(errorResponse, response);
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

  jwt.verify(token, JWT_SECRET as string, (err: any, user: any) => {
    if (err) return onError();
    onSuccess();
  });

}

function validateTokenUserGroup(token: string, userGroupId: string, roles: string[], onSuccess: Function, onError: Function): void {
  const userService: IUserService = AppContainer.get<IUserService>("IUserService");

  userService.validateTokenUserGroup(token, userGroupId, roles)
    .then(() => {
      onSuccess();
    })
    .catch((e) => {
      onError();
    });

}
import { Request, Response } from "express";
import { AppContainer } from "../container/container";
import { IInstaller } from "../contracts/IInstaller";
import { ErrorHandler } from "../error/ErrorHandler";
import { Routes } from "../routes";

export class RoutesInstaller implements IInstaller {
  private app: any;

  constructor(app: any) {
    this.app = app;
  }

  install(): void {
    Routes.forEach(routes => {
      routes.routes.forEach(route => {
        (this.app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
          const result = (AppContainer.resolve(routes.controller as any))[route.action](req, res, next);
          if (result instanceof Promise) {
            result
              .then(result => result !== null && result !== undefined ? res.send(result) : undefined)
              .catch((error: Error) => {
                const errorHandler = ErrorHandler.getInstance();
                const errorResponse = errorHandler.handleError(error);
                errorHandler.sendErrorResponse(errorResponse, res);
              });
          } else if (result !== null && result !== undefined) {
            res.json(result);
          } else {
            res.status(500);
            res.send();
          }
        });
      })
    });
  }

}
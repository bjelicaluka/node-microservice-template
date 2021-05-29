import { Application, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { AppContainer } from "../AppContainer";
import { IInstaller } from "./contracts/IInstaller";
import { ErrorHandler } from "../error/ErrorHandler";
import { Routes } from "../routes";
import { validationResult } from 'express-validator';

@injectable()
export class RoutesInstaller implements IInstaller {
  private app: Application;

  constructor(@inject("Application") app: Application) {
    this.app = app;
  }

  install(): void {
    Routes.forEach(routes => {
      routes.routes.forEach(route => {
        (this.app as any)[route.method](route.route, ...(route.validations ? [route.validations] : []), (req: Request, res: Response, next: Function) => {

          const errors = validationResult(req);
          if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() }).send();
          }

          const result = (AppContainer.resolve(routes.controller as any))[route.action](req, res, next);
          if (result instanceof Promise) {
            result
              .then(result => result !== null && result !== undefined ? res.send(result) : undefined)
              .catch((error: Error) => {
                const errorResponse = ErrorHandler.handleError(error);
                ErrorHandler.sendErrorResponse(errorResponse, res);
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
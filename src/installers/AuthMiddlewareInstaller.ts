import { Application } from "express";
import { inject, injectable } from "inversify";
import { IInstaller } from "./contracts/IInstaller";
import { AuthorizationMiddleware } from "../middleware/SecurityMiddleware";
import { Routes } from "../routes";

@injectable()
export class AuthMiddlewareInstaller implements IInstaller {
    private app: Application;

    constructor(@inject("Application") app: Application) {
        this.app = app;
    }

    install(): void {
        Routes.forEach(routes => {
            routes.routes.forEach(route => {
                if (route.roles && route.roles.length) {
                    this.app[route.method](route.route, AuthorizationMiddleware(route.roles));
                }
            });
        });
    }

}
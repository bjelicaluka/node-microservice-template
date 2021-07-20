import { Application } from "express";
import { inject, injectable } from "inversify";
import { Route, Routes } from "../routes";
import { IInstaller } from "./contracts/IInstaller";

@injectable()
export class RequestValidationInstaller implements IInstaller {
    private app: Application;

    constructor(@inject("Application") app: Application) {
        this.app = app;
    }

    install(): void {
        Routes.forEach(routes => {
            routes.routes.forEach(route => {
                route.validations?.forEach(this.useValidations(route))
            });
        });
    }

    private useValidations = (route: Route) => (validation: Function) => {
        this.app[route.method](route.route, validation)
    }

}
import express, { Application } from "express";
import { inject, injectable } from "inversify";
import { Route, Routes } from "../routes";
import { IInstaller } from "./contracts/IInstaller";
import cors from 'cors';

@injectable()
export class MiddlewareInstaller implements IInstaller {
    private app: Application;

    constructor(@inject("Application") app: Application) {
        this.app = app;
    }

    install(): void {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors({origin: '*'}));

        Routes.forEach(routes => {
            routes.routes.forEach(route => {
                route.middleware?.forEach(this.useMiddleware(route))
            });
        });
    }

    private useMiddleware = (route: Route) => (middleware: Function) => {
        this.app[route.method](route.route, middleware)
    }

}
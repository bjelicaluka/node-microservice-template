import express, { Application } from "express";
import { inject, injectable } from "inversify";
import { IInstaller } from "./contracts/IInstaller";

@injectable()
export class MiddlewareInstaller implements IInstaller {
    private app: Application;

    constructor(@inject("Application") app: Application) {
        this.app = app;
    }

    install(): void {
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
    }

}
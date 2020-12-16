import {Request, Response} from "express";
import { IInstaller } from "../contracts/IInstaller";
import { Routes } from "../routes";

export class RoutesInstaller implements IInstaller {
    private app: any;

    constructor(app: any) {
        this.app = app;
    }

    install(): void {
        Routes.forEach(route => {
            (this.app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                const result = (new (route.controller as any))[route.action](req, res, next);
                if (result instanceof Promise) {
                    result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);
    
                } else if (result !== null && result !== undefined) {
                    res.json(result);
                }
            });
        });
    }

}
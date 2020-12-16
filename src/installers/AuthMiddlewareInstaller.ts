import { IInstaller } from "../contracts/IInstaller";
import { AuthServiceMiddleware } from "../middleware/AuthServiceMiddleware";
import { Routes } from "../routes";

export class AuthMiddlewareInstaller implements IInstaller {
    private app: any;

    constructor(app: any) {
        this.app = app;
    }

    install(): void {
        Routes.forEach(route => {
            if(route.roles && route.roles.length) {
                this.app[route.method](route.route, AuthServiceMiddleware(route.roles));
            }
        });
    }

}
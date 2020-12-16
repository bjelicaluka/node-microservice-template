import * as bodyParser from "body-parser";
import { IInstaller } from "../contracts/IInstaller";

export class MiddlewareInstaller implements IInstaller {
    private app: any;

    constructor(app: any) {
        this.app = app;
    }

    install(): void {
        this.app.use(bodyParser.json());
    }

}
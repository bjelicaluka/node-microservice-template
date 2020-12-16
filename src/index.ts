import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import { MiddlewareInstaller } from "./installers/MiddlewareInstaller";
import { AuthMiddlewareInstaller } from "./installers/AuthMiddlewareInstaller";
import { RoutesInstaller } from "./installers/RoutesInstaller";
import { IInstaller } from "./contracts/IInstaller";

// Create connection to the datastore
createConnection().then(async () => {

    // Create Express app
    const app = express();
    
    // Install middleware and routes
    var installers: IInstaller[] = [
        new MiddlewareInstaller(app),
        new AuthMiddlewareInstaller(app),
        new RoutesInstaller(app)
    ];
    installers.forEach(i => i.install());

    // Start the app
    app.listen(3001);
    console.log("Express server has started on port 3000.");

}).catch(error => console.log(error));




import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { Server } from 'http';
import { MiddlewareInstaller } from "./installers/MiddlewareInstaller";
import { AuthMiddlewareInstaller } from "./installers/AuthMiddlewareInstaller";
import { RoutesInstaller } from "./installers/RoutesInstaller";
import { IInstaller } from "./contracts/IInstaller";
import { ORM_CONFIG, RemoteServicesInfo } from "./config";
import { SocketIOServer } from "./socket-io/SocketIOServer";

const PORT = 4000;

// Create connection to the datastore
createConnection(ORM_CONFIG).then(async () => {

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
  const httpServer = new Server(app);
  // Initialize Socket IO Server
  const io = SocketIOServer.getInstance(httpServer);
  // TEST PURPOSES ONLY
  io.createNewNamespace("141047f6-010c-4e4a-a84d-dbc31281740b");
  setInterval(() => io.emitAlarm("141047f6-010c-4e4a-a84d-dbc31281740b", "Hello."), 2000);
  //
  httpServer.listen(PORT);
  console.log(`Server is listening on port ${PORT}.`);
  console.log(`Auth Service API url: ${RemoteServicesInfo.AuthService.API_URL}`);
  console.log(`User Service API url: ${RemoteServicesInfo.UserService.API_URL}`);

}).catch(error => console.log(error));
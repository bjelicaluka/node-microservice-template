import { createConnection } from "typeorm";
import * as express from "express";
import { Application } from 'express';
import { Server } from 'http';
import { MiddlewareInstaller } from "./installers/MiddlewareInstaller";
import { AuthMiddlewareInstaller } from "./installers/AuthMiddlewareInstaller";
import { RoutesInstaller } from "./installers/RoutesInstaller";
import { IInstaller } from "./contracts/IInstaller";
import { ORM_CONFIG, RemoteServicesInfo } from "./config";
import { SocketIOServer } from "./socket-io/SocketIOServer";

const PORT = 4000;

main();

function main() {
  connectToDatastore().then(startApplication).catch(handleConnectionError);
}

function connectToDatastore(): Promise<any> {
  return createConnection(ORM_CONFIG);
}

function startApplication(): void {
  const app: Application = express();

  installMiddleware(app);

  const server = initializeServer(app);
  startServer(server);

  console.log(`Auth Service API url: ${RemoteServicesInfo.AuthService.API_URL}`);
  console.log(`User Service API url: ${RemoteServicesInfo.UserService.API_URL}`);
}

function handleConnectionError(error: Error) {
  console.log(`${error.name}: ${error.message}`);
}

function installMiddleware(app: Application) {
  var installers: IInstaller[] = [
    new MiddlewareInstaller(app),
    new AuthMiddlewareInstaller(app),
    new RoutesInstaller(app)
  ];
  installers.forEach(i => i.install());
}

function initializeServer(app: Application): Server {
  const httpServer = new Server(app);

  const io = SocketIOServer.getInstance(httpServer);
  setInterval(() => io.emitAlarm("141047f6-010c-4e4a-a84d-dbc31281740b", "Hello."), 2000);
  return httpServer;
}

function startServer(httpServer: Server): void {
  httpServer.listen(PORT);
  
  console.log(`Server is listening on port ${PORT}.`);
}
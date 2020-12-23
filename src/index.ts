import { createConnection } from "typeorm";
import { Server } from 'http';
import { IInstaller } from "./contracts/IInstaller";
import { ORM_CONFIG, RemoteServicesInfo } from "./config";
import { AppContainer } from "./AppContainer";
import { IEventDispatcher } from "./contracts/events/IEventDispatcher";
import { IEventHandler } from "./contracts/events/IEventHandler";
import { SocketIOServer } from "./events/SocketIOServer";

const PORT = 4000;

main();

function main() {
  connectToDatastore().then(startApplication).catch(handleConnectionError);
}

function connectToDatastore(): Promise<any> {
  return createConnection(ORM_CONFIG);
}

function startApplication(): void {
  
  installMiddleware();
  startServer();
  initializeServer(); // Test purposes

  console.log(`Auth Service API url: ${RemoteServicesInfo.AuthService.API_URL}`);
  console.log(`User Service API url: ${RemoteServicesInfo.UserService.API_URL}`);
}

function handleConnectionError(error: Error) {
  console.log(`${error.name}: ${error.message}`);
}

function installMiddleware() {
  const installers: IInstaller[] = AppContainer.getAll<IInstaller>("IInstaller");
  installers.forEach(i => i.install());
}

// Test purposes
function initializeServer(): void {
  const io = AppContainer.get<IEventDispatcher>("IEventDispatcher");
  setInterval(() => io.dispatchEvent("test", 'alarm', "Hello."), 2000);

  const handler = AppContainer.get<IEventHandler>("IEventHandler");
  handler.addEventListener('test', 'ok', (data) => console.log(data));
}

function startServer(): void {
  const httpServer = AppContainer.get<Server>(Server);
  httpServer.listen(PORT);
  
  console.log(`Server is listening on port ${PORT}.`);
}
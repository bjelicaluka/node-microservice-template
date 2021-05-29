import { Server } from 'http';
import { IInstaller } from "./installers/contracts/IInstaller";
import { LOGGING, PORT, RemoteServicesInfo } from "./config";
import { AppContainer } from "./AppContainer";


function startApplication(): void {
  installComponents();
  startServer();

  LOGGING && console.log(`User Service API url: ${RemoteServicesInfo.UserService.API_URL}`);
}

function installComponents() {
  const installers: IInstaller[] = AppContainer.getAll<IInstaller>("IInstaller");
  installers.forEach(i => i.install());
}

function startServer(): void {
  const httpServer = AppContainer.get<Server>(Server);
  httpServer.listen(PORT);
  
  LOGGING && console.log(`Server is listening on port ${PORT}.`);
}

startApplication();
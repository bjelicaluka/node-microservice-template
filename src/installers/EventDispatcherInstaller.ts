import { Container, inject, injectable } from "inversify";
import { IInstaller } from "./contracts/IInstaller";
import { SocketIOServer } from "../services/implementation/events/SocketIOServer";
import { IEventDispatcher } from "../services/contracts/events/IEventDispatcher";
import { IEventHandler } from "../services/contracts/events/IEventHandler";

@injectable()
export class EventDispatcherInstaller implements IInstaller {

  connectionRertyTimeout = 5000;

  constructor(@inject("AppContainer") private appContainer: Container) { }

  install(): void {
    this.appContainer.bind<SocketIOServer>(SocketIOServer).toSelf().inSingletonScope();
    const socketIoServerInstance = this.appContainer.get(SocketIOServer);

    this.appContainer.bind<IEventDispatcher>("IEventDispatcher").toConstantValue(socketIoServerInstance);
    this.appContainer.bind<IEventHandler>("IEventHandler").toConstantValue(socketIoServerInstance);
  }

}
import { Server as HttpServer } from 'http';
import { inject, injectable } from 'inversify';
import { Namespace, Server } from "socket.io";
import { IEventDispatcher } from '../contracts/events/IEventDispatcher';
import { SocketUserGroupSpecificMiddleware } from "../middleware/SecurityMiddleware";

const BASE_NAMESPACE = 'live-alarms';
const LOGGING = false;

interface NamespacesRegistry {
  [key: string]: Namespace
}

@injectable()
export class SocketIOServer implements IEventDispatcher {
  private namespaces: NamespacesRegistry;
  private io: Server;

  constructor(@inject(HttpServer) httpServer: HttpServer) {
    this.io = new Server(httpServer, { cors: { origin: "*" } });
    this.namespaces = {};
  }

  public dispatchEvent(namespace: string, event: string, data: any) {
    this.getNamespace(namespace).emit(event, data);
  }

  private getNamespace(namespace: string) {
    if (!this.namespaces[namespace]) {
      this.createNewNamespace(namespace);
    }
    return this.namespaces[namespace];
  }

  private createNewNamespace(namespace: string) {
    this.namespaces[namespace] = this.io.of(`/${BASE_NAMESPACE}/${namespace}`);
    
    this.namespaces[namespace].use(SocketUserGroupSpecificMiddleware(namespace, ['CloudAdmin', 'Admin']));
    
    this.namespaces[namespace].on('connection', (socket) => {
      LOGGING && console.log(`Client connected to Alarm namespace, namespace: ${namespace}.`);
      socket.on('disconnect', () => {
        LOGGING && console.log(`Client disconnected from Alarm namespace, namespace: ${namespace}.`);
      });
    });
  }
}
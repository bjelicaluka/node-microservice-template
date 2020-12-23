import { Server as HttpServer } from 'http';
import { inject, injectable } from 'inversify';
import { Namespace, Server, Socket } from "socket.io";
import { IEventDispatcher } from '../contracts/events/IEventDispatcher';
import { IEventHandler } from '../contracts/events/IEventHandler';
import { SocketUserGroupSpecificMiddleware } from "../middleware/SecurityMiddleware";

const BASE_NAMESPACE = 'live-alarms';
const LOGGING = false;

interface NamespacesRegistry {
  [key: string]: Namespace
}

interface EventListener {
  event: string;
  listener: (data: any) => void;
}

interface NamespaceEventListenerRegistry {
  [key: string]: EventListener[];
}

@injectable()
export class SocketIOServer implements IEventDispatcher, IEventHandler {
  private namespaces: NamespacesRegistry;
  private namespaceEventListeners: NamespaceEventListenerRegistry;
  private io: Server;

  constructor(@inject(HttpServer) httpServer: HttpServer) {
    this.io = new Server(httpServer, { cors: { origin: "*" } });
    this.namespaces = {};
    this.namespaceEventListeners = {};
  }

  addEventListener(namespace: string, event: string, listener: (data: any) => void): void {
    this.getNamespace(namespace).sockets.forEach(socket => socket.on(event, listener));
    this.namespaceEventListeners[namespace].push({event, listener});
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

  public createNewNamespace(namespace: string) {
    this.namespaces[namespace] = this.io.of(`/${BASE_NAMESPACE}/${namespace}`);
    this.namespaceEventListeners[namespace] = [];

    this.namespaces[namespace].use(SocketUserGroupSpecificMiddleware(namespace, ['CloudAdmin', 'Admin']));
    
    this.namespaces[namespace].on('connection', (socket: Socket) => {
      LOGGING && console.log(`Client connected to Alarm namespace, namespace: ${namespace}.`);
      socket.on('disconnect', () => {
        LOGGING && console.log(`Client disconnected from Alarm namespace, namespace: ${namespace}.`);
      });

      this.namespaceEventListeners[namespace].forEach((eventListener: EventListener) => {
        socket.on(eventListener.event, eventListener.listener);
      })
    });
  }
}
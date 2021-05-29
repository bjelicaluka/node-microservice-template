import { Server as HttpServer } from 'http';
import { inject, injectable } from 'inversify';
import { Namespace, Server, Socket } from "socket.io";
import { LOGGING } from '../../../config';
import { IEventDispatcher } from '../../contracts/events/IEventDispatcher';
import { IEventHandler } from '../../contracts/events/IEventHandler';
import { SocketUserGroupSpecificMiddleware } from "../../../middleware/SecurityMiddleware";
import {RedisClient} from 'redis';
import {createAdapter} from 'socket.io-redis';

const BASE_NAMESPACE = 'live-data';

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

enum RedisConnectionStatus {
  Connected,
  Connecting
}

@injectable()
export class SocketIOServer implements IEventDispatcher, IEventHandler {
  private namespaces: NamespacesRegistry;
  private namespaceEventListeners: NamespaceEventListenerRegistry;
  private io: Server;
  

  constructor(@inject(HttpServer) httpServer: HttpServer, @inject(RedisClient) private client: RedisClient) {
    this.io = new Server(httpServer, { cors: { origin: "*" } });
    this.createRedisAdapter();
    this.namespaces = {};
    this.namespaceEventListeners = {};
  }

  private createRedisAdapter(): void {
    if(this.client.connected) {
      this.io.adapter(createAdapter({pubClient: this.client, subClient: this.client.duplicate()}));
      LOGGING && console.log(`[${new Date().toISOString()}] - socket.io server create redis adapter success.`);
    } else {
      setTimeout(() => this.createRedisAdapter(), 1000);
    }
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

    const userGroupId = namespace.split("/")[0];
    this.namespaces[namespace].use(SocketUserGroupSpecificMiddleware(userGroupId, ['CloudAdmin', 'Admin']));
    
    this.namespaces[namespace].on('connection', (socket: Socket) => {
      LOGGING && console.log(`Client connected to Live Data namespace, namespace: ${namespace}.`);
      socket.on('disconnect', () => {
        LOGGING && console.log(`Client disconnected from Live Data namespace, namespace: ${namespace}.`);
      });

      this.namespaceEventListeners[namespace].forEach((eventListener: EventListener) => {
        socket.on(eventListener.event, eventListener.listener);
      })
    });
  }
}
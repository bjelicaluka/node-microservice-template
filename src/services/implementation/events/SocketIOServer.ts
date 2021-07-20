import { Server as HttpServer } from 'http';
import { inject, injectable } from 'inversify';
import { Namespace, Server, Socket } from "socket.io";
import { LOGGING } from '../../../config';
import { IEventDispatcher } from '../../contracts/events/IEventDispatcher';
import { IEventHandler } from '../../contracts/events/IEventHandler';
import {RedisClient} from 'redis';
import {createAdapter} from 'socket.io-redis';
import { INamespaceProvider } from '../../contracts/events/INamespaceProvider';

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
export class SocketIOServer implements IEventDispatcher, IEventHandler, INamespaceProvider {
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

  public addEventListener(namespace: string, event: string, listener: (data: any) => void): void {
    this.getNamespace(namespace).sockets.forEach(socket => socket.on(event, listener));
    this.namespaceEventListeners[namespace].push({event, listener});
  }

  public dispatchEvent(namespace: string, event: string, data: any) {
    this.getNamespace(namespace).emit(event, data);
  }

  public getNamespace(namespace: string): Namespace {
    return this.namespaces[namespace];
  }

  public createNamespaceIfNotExists(namespace: string): Namespace {
    if (this.namespaces[namespace])
      return this.namespaces[namespace];

    LOGGING && console.log(`Client created a new namespace: ${namespace}.`);
    this.namespaces[namespace] = this.io.of(namespace);
    this.namespaceEventListeners[namespace] = [];
    
    this.namespaces[namespace].on('connection', (socket: Socket) => {
      LOGGING && console.log(`Client connected to namespace: ${namespace}.`);
      socket.on('disconnect', () => {
        LOGGING && console.log(`Client disconnected from namespace: ${namespace}.`);
      });

      this.namespaceEventListeners[namespace].forEach((eventListener: EventListener) => {
        socket.on(eventListener.event, eventListener.listener);
      })
    });

    return this.namespaces[namespace];
  }
}
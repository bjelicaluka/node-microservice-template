import { Server as HttpServer } from 'http';
import { Namespace, Server } from "socket.io";
import { SocketAuthorizationMiddleware, SocketUserGroupSpecificMiddleware } from "../middleware/SecurityMiddleware";

const BASE_NAMESPACE = 'live-alarms';
const LOGGING = false;

interface NamespacesRegistry {
  [key: string]: Namespace
}

// Singleton
export class SocketIOServer {
  private static instance: SocketIOServer;
  private namespaces: NamespacesRegistry;
  private io: Server;

  private constructor(httpServer: HttpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*"
      }
    });
    this.namespaces = {};
  }

  static getInstance(httpServer?: HttpServer) {
    if (!SocketIOServer.instance && !httpServer) {
      throw "Not instantiated";
    } else if (!SocketIOServer.instance && httpServer) {
      SocketIOServer.instance = new SocketIOServer(httpServer);
    }
    return SocketIOServer.instance;
  }

  emitAlarm(userGroupId: string, data: any) {
    this.getNamespace(userGroupId).emit('alarm', data);
  }

  getNamespace(userGroupId: string) {
    if (!this.namespaces[userGroupId]) {
      this.createNewNamespace(userGroupId);
    }
    return this.namespaces[userGroupId];
  }

  createNewNamespace(userGroupId: string) {
    this.namespaces[userGroupId] = this.io.of(`/${BASE_NAMESPACE}/${userGroupId}`);
    
    this.namespaces[userGroupId].use(SocketAuthorizationMiddleware(['CloudAdmin', 'Admin']));
    this.namespaces[userGroupId].use(SocketUserGroupSpecificMiddleware(userGroupId));
    
    this.namespaces[userGroupId].on('connection', (socket) => {
      LOGGING && console.log(`Client connected to Alarm namespace, userGroupId: ${userGroupId}.`);
      socket.on('disconnect', () => {
        LOGGING && console.log(`Client disconnected from Alarm namespace, userGroupId: ${userGroupId}.`);
      });
    });
  }
}
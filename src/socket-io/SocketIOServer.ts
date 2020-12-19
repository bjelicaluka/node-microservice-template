import { Server as HttpServer } from 'http';
import { Namespace, Server } from "socket.io";
import { SocketAuthServiceMiddleware } from "../middleware/AuthServiceMiddleware";

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

  emitAlarm(sensorId: string, data: any) {
    this.getNamespace(sensorId).emit('alarm', data);
  }

  getNamespace(sensorId: string) {
    if (!this.namespaces[sensorId]) {
      this.createNewNamespace(sensorId);
    }
    return this.namespaces[sensorId];
  }

  createNewNamespace(sensorId: string) {
    this.namespaces[sensorId] = this.io.of(`/${BASE_NAMESPACE}/${sensorId}`);
    
    this.namespaces[sensorId].use(SocketAuthServiceMiddleware(['CloudAdmin']));
    
    this.namespaces[sensorId].on('connection', (socket) => {
      LOGGING && console.log(`Client connected to Alarm namespace, sensorId: ${sensorId}.`);
      socket.on('disconnect', () => {
        LOGGING && console.log(`Client disconnected from Alarm namespace, sensorId: ${sensorId}.`);
      });
    });
  }
}
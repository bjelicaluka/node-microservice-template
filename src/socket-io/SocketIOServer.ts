import { Server } from "socket.io";
import { SocketAuthServiceMiddleware } from "../middleware/AuthServiceMiddleware";

const BASE_NAMESPACE = 'live-alarms';
const LOGGING = false;

// Singleton
export class SocketIOServer {
  private static instance: SocketIOServer;
  private namespaces;
  private io: Server;

  private constructor(httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: "*"
      }
    });
    this.namespaces = {};
  }

  static getInstance(httpServer?) {
    if (!SocketIOServer.instance && !httpServer) {
      throw "Not instantiated";
    } else if (!SocketIOServer.instance && httpServer) {
      SocketIOServer.instance = new SocketIOServer(httpServer);
    }
    return SocketIOServer.instance;
  }

  emitAlarm(sensorId, data) {
    this.getNamespace(sensorId).emit('alarm', data);
  }

  getNamespace(sensorId) {
    if (!this.namespaces[sensorId]) {
      this.createNewNamespace(sensorId);
    }
    return this.namespaces[sensorId];
  }

  createNewNamespace(sensorId) {
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
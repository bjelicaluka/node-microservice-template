import { Server as HttpServer } from 'http';
import { inject, injectable } from 'inversify';
import { Namespace, Server } from "socket.io";
import { IAlarmEventDispatcher } from '../contracts/IAlarmEventDispatcher';
import { SocketUserGroupSpecificMiddleware } from "../middleware/SecurityMiddleware";

const BASE_NAMESPACE = 'live-alarms';
const LOGGING = false;

interface NamespacesRegistry {
  [key: string]: Namespace
}

@injectable()
export class SocketIOServer implements IAlarmEventDispatcher {
  private namespaces: NamespacesRegistry;
  private io: Server;

  constructor(@inject(HttpServer) httpServer: HttpServer) {
    this.io = new Server(httpServer, { cors: { origin: "*" } });
    this.namespaces = {};
  }

  public dispatchAlarm(userGroupId: string, data: any) {
    this.getNamespace(userGroupId).emit('alarm', data);
  }

  private getNamespace(userGroupId: string) {
    if (!this.namespaces[userGroupId]) {
      this.createNewNamespace(userGroupId);
    }
    return this.namespaces[userGroupId];
  }

  private createNewNamespace(userGroupId: string) {
    this.namespaces[userGroupId] = this.io.of(`/${BASE_NAMESPACE}/${userGroupId}`);
    
    this.namespaces[userGroupId].use(SocketUserGroupSpecificMiddleware(userGroupId, ['CloudAdmin', 'Admin']));
    
    this.namespaces[userGroupId].on('connection', (socket) => {
      LOGGING && console.log(`Client connected to Alarm namespace, userGroupId: ${userGroupId}.`);
      socket.on('disconnect', () => {
        LOGGING && console.log(`Client disconnected from Alarm namespace, userGroupId: ${userGroupId}.`);
      });
    });
  }
}
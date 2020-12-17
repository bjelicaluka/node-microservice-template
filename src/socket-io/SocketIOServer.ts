const BASE_NAMESPACE = 'live-alarms';
const LOGGING = false;

// Singleton
export class SocketIOServer {
  private static instance;
  private namespaces;
  private io;

  private constructor(io) {
    this.io = io;
    this.namespaces = {};
  }

  static getInstance(io?) {
    if (!SocketIOServer.instance && !io) {
      throw "Not instantiated";
    } else if (!SocketIOServer.instance && io) {
      SocketIOServer.instance = new SocketIOServer(io);
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

    this.namespaces[sensorId].on('connection', (socket) => {
      LOGGING && console.log(`Client connected to Alarm namespace, sensorId: ${sensorId}.`);
      socket.on('disconnect', () => {
        LOGGING && console.log(`Client disconnected from Alarm namespace, sensorId: ${sensorId}.`);
      });
    });
  }
}
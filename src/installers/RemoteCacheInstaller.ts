import { Container, inject, injectable } from "inversify";
import { LOGGING, REDIS_CONFIG } from "../config";
import { IInstaller } from "./contracts/IInstaller";
import { IRemoteCacheService } from "../services/contracts/cache/IRemoteCacheService";
import { RemoteCacheService } from "../services/implementation/cache/RemoteCacheService";
import { RedisClient } from "redis";

@injectable()
export class RemoteCacheInstaller implements IInstaller {

  connectionRertyTimeout = 5000;

  constructor(@inject("AppContainer") private appContainer: Container) { }

  install(): void {
    this.appContainer.bind<IRemoteCacheService>("IRemoteCacheService").to(RemoteCacheService).inSingletonScope();
    
    const redisClient = new RedisClient(REDIS_CONFIG).on('error', () => 
      LOGGING && console.log(`[${new Date().toISOString()}] - Failed to connect to the Redis server. Attempting to reconnect.`));
    this.appContainer.bind<RedisClient>(RedisClient).toConstantValue(redisClient);
  }

}
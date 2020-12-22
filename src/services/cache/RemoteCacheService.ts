import { injectable } from 'inversify';
import { RedisClient } from 'redis';
import { REDIS_CONFIG } from '../../config';
import { IRemoteCacheService } from '../../contracts/services/cache/IRemoteCacheService';

const EXPIRATION_TIME = 5; // minute

@injectable()
export class RemoteCacheService implements IRemoteCacheService {

  private client: RedisClient;

  constructor() {
    this.client = new RedisClient(REDIS_CONFIG);
  }
  
  keyExists(key: string): Promise<boolean> {
    return new Promise((resolve: Function, reject: Function) => this.client.exists(key, (error: Error, exists: number) => {
      if(error)
        reject(error);
      else
        resolve(exists !== 0);
    }));
  }
  
  cacheValue(key: string, value: any): void {
    this.client.set(key, value, () => {
      this.client.expire(key, EXPIRATION_TIME);
    });
  }
  
  getValue(key: string): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => this.client.get(key, (error: Error, value: any) => {
      if(error)
        reject(error);
      else
        resolve(value);
    }));
  }

}

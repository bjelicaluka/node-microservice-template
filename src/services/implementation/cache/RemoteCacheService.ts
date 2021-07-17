import { inject, injectable } from 'inversify';
import { RedisClient } from 'redis';
import { IRemoteCacheService } from '../../contracts/cache/IRemoteCacheService';

const DEFAULT_EXPIRATION_TIME = 30; // minute

@injectable()
export class RemoteCacheService implements IRemoteCacheService {

  constructor(@inject(RedisClient) private client: RedisClient) { }
  
  keyExists(key: string): Promise<boolean> {
    return new Promise((resolve: Function, reject: Function) => this.client.exists(key, (error: Error, exists: number) => {
      if(error)
        reject(error);
      else
        resolve(exists !== 0);
    }));
  }
  
  cacheValue(key: string, value: any, expiration: number = DEFAULT_EXPIRATION_TIME): void {
    this.client.set(key, JSON.stringify(value), () => {
      this.client.expire(key, expiration);
    });
  }
  
  getValue(key: string): Promise<any> {
    return new Promise((resolve: Function, reject: Function) => this.client.get(key, (error: Error, value: any) => {
      if(error)
        reject(error);
      else {
        try {
          resolve(JSON.parse(value));
        } catch (parsingError) {
          reject(parsingError)
        }
      }
    }));
  }

}

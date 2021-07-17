export interface IRemoteCacheService {
  
  keyExists(key: string): Promise<boolean>;
  cacheValue(key: string, value: any, expiration: number): void;
  getValue(key: string): Promise<any>;
  
}
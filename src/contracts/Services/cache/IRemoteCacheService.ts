export interface IRemoteCacheService {
  
  keyExists(key: string): Promise<boolean>;
  cacheValue(key: string, value: any): void;
  getValue(key: string): Promise<any>;
  
}
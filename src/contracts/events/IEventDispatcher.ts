export interface IEventDispatcher {
  dispatchEvent(namespace: string, event: string, data: any): void;
}
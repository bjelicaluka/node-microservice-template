export interface IEventHandler {
  addEventListener(namespace: string, event: string, listener: (args: any[]) => void): void;
}
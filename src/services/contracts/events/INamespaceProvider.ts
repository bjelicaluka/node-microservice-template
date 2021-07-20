import { Namespace } from "socket.io";

export interface INamespaceProvider {
  createNamespaceIfNotExists(namespace: string): Namespace;
  getNamespace(namespace: string): Namespace;
}
import { Container, inject, injectable } from "inversify";
import { Connection, createConnection, Repository } from "typeorm";
import { LOGGING, ORM_CONFIG } from "../config";
import { IInstaller } from "./contracts/IInstaller";
import { Test } from "../model/Test";

@injectable()
export class DataSourceInstaller implements IInstaller {

  connectionRertyTimeout = 5000;

  constructor(@inject("AppContainer") private appContainer: Container) { }

  install(): void {
    createConnection(ORM_CONFIG)
      .then(connection => {
        this.installRepositories(connection);
      })
      .catch(error => {
        this.retryConnection(error);
      });
  }

  private retryConnection(error: Error): void {
    LOGGING && console.log(`${error.name}: ${error.message}. Attempting to reconnect in ${this.connectionRertyTimeout/1000}s.`);
    setTimeout(() => {
      this.install();
    }, this.connectionRertyTimeout);
  }

  private installRepositories(connection: Connection): void {
    this.appContainer.bind<Repository<Test>>("TestRepository").toDynamicValue(() => connection.getRepository(Test)).inRequestScope();
  }

}
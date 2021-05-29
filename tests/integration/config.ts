import { ConnectionOptions } from "typeorm";
import { BaseEntity } from "../../src/model/BaseEntity";
import { Test } from "../../src/model/Test";

export const TEST_ORM_CONFIG: ConnectionOptions = {
  type: "sqlite",
  database: "./database.sql",
  synchronize: true,
  logging: false,
  entities: [
    Test,
    BaseEntity,
  ]
}
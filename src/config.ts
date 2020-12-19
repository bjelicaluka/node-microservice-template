import { ConnectionOptions } from 'typeorm';
import { BaseEntity } from "./entity/BaseEntity";
import { Alarm } from "./entity/Alarm";
import { AlarmRecord } from "./entity/AlarmRecord";
import { AlarmSensor } from "./entity/AlarmSensor";

interface ServicesInfo {
    AuthService: {
        API_URL: string;
        ROUTE: string;
    };
}

export const RemoteServicesInfo: ServicesInfo = {
    AuthService: {
        API_URL: process.env.AUTH_SERVICE_URL || null,
        ROUTE: "/Authorization/validate"
    }
};

export const ORM_CONFIG: ConnectionOptions = {
    type: "sqlite",
    database: "../database.sql",
    // type: "mysql",
    // host: "mariadb-alarm",
    // port: 3306,
    // username: "root",
    // password: "1234",
    // database: "alarms_db",
    synchronize: true,
    logging: false,
    entities: [
      BaseEntity,
      Alarm,
      AlarmRecord,
      AlarmSensor,
    ]
  }
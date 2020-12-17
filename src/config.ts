import { ConnectionOptions } from 'typeorm';
import { BaseEntity } from "./entity/BaseEntity";
import { Alarm } from "./entity/Alarm";
import { AlarmRecord } from "./entity/AlarmRecord";
import { AlarmSensor } from "./entity/AlarmSensor";

interface ServicesInfo {
    AuthService: {
        API: string;
        PORT: number;
        ROUTE: string;
    };
}

export const RemoteServicesInfo: ServicesInfo = {
    AuthService: {
        API: "http://localhost",
        PORT: 5000,
        ROUTE: "/User/validate"
    }
};

export const ORM_CONFIG: ConnectionOptions = {
    type: "sqlite",
    database: "../database.sql",
    synchronize: true,
    logging: false,
    entities: [
      BaseEntity,
      Alarm,
      AlarmRecord,
      AlarmSensor,
    ]
  }
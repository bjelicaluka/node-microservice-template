import { ConnectionOptions } from 'typeorm';
import { BaseEntity } from "./entity/BaseEntity";
import { Alarm } from "./entity/Alarm";
import { AlarmRecord } from "./entity/AlarmRecord";
import { AlarmSensor } from "./entity/AlarmSensor";

type RouteFormatterFunction = (params: string[]) => string;

interface ServicesInfo {
  AuthService: {
    API_URL: string;
    TOKEN_VALIDATION_ROUTE: string;
  };
  UserService: {
    API_URL: string;
    TOKEN_USER_GROUP_VALIDATION_ROUTE: string;
  },
  SensorService: {
    API_URL: string;
    AUTHENTICATE_ROUTE: string;
    FETCH_SENSOR_ROUTE: RouteFormatterFunction;
  },
};

const isProductionConfiguration: boolean = process.env.CONFIGURATION === 'production';
export const CONFIGURATION = {
  PRODUCTION: isProductionConfiguration,
  DEBUG: !isProductionConfiguration,
}

export const RemoteServicesInfo: ServicesInfo = {
  AuthService: {
    API_URL: process.env.AUTH_SERVICE_URL || "http://bjelicaluka.live:3333/authService",
    TOKEN_VALIDATION_ROUTE: "/Authorization/validate",
  },
  UserService: {
    API_URL: process.env.USER_SERVICE_URL || "http://bjelicaluka.live:3333/userService",
    TOKEN_USER_GROUP_VALIDATION_ROUTE: "/Authorization/role-in-group",
  },
  SensorService: {
    API_URL: process.env.SENSOR_SERVICE_URL || "http://bjelicaluka.live:3333/sensorService",
    AUTHENTICATE_ROUTE: "/Authentication/authenticate",
    FETCH_SENSOR_ROUTE: (params) => `/groups/${params[0]}/sensors/${params[1]}`,
  }
};

const connectionInfo: ConnectionOptions = CONFIGURATION.DEBUG ?
  {
    type: "sqlite",
    database: "../database.sql",
  }
  :
  {
    type: "mysql",
    host: "mariadb-alarm",
    port: 3306,
    username: "root",
    password: "1234",
    database: "alarms_db",
  }

export const ORM_CONFIG: ConnectionOptions = {
  ...connectionInfo,
  synchronize: true,
  logging: false,
  entities: [
    BaseEntity,
    Alarm,
    AlarmRecord,
    AlarmSensor,
  ]
}

export const REDIS_CONFIG = {
  port: 6379,
  host: 'localhost',
  password: "1234"
}
import { ConnectionOptions } from 'typeorm';
import { BaseEntity } from "./entity/BaseEntity";
import { Alarm } from "./entity/Alarm";
import { AlarmRecord } from "./entity/AlarmRecord";
import { AlarmSensor } from "./entity/AlarmSensor";

interface ServicesInfo {
    AuthService: {
        API_URL: string;
        TOKEN_VALIDATION_ROUTE: string;
    };
    UserService: {
        API_URL: string;
        TOKEN_USER_GROUP_VALIDATION_ROUTE: string;
    }
};

const isProductionConfiguration: boolean = process.env.CONFIGURATION === 'production';
export const CONFIGURATION = {
    PRODUCTION: isProductionConfiguration,
    DEBUG: !isProductionConfiguration,
}

export const RemoteServicesInfo: ServicesInfo = {
    AuthService: {
        API_URL: process.env.AUTH_SERVICE_URL || "http://bjelicaluka.live:3333/authService",
        TOKEN_VALIDATION_ROUTE: "/Authorization/validate"
    },
    UserService: {
        API_URL: process.env.USER_SERVICE_URL || "http://bjelicaluka.live:3333/userService",
        TOKEN_USER_GROUP_VALIDATION_ROUTE: "/Authorization/role-in-group"
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
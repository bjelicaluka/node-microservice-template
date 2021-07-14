import { ConnectionOptions } from 'typeorm';
import { BaseEntity } from "./model/BaseEntity";
import { Test } from './model/Test';

const config = JSON.parse(process.env.CONFIG) || '';

type RouteFormatterFunction = (params: string[]) => string;

interface ServicesInfo {
  UserService: {
    API_URL: string;
    TOKEN_USER_GROUP_VALIDATION_ROUTE: string;
  };
};

export const PORT = process.env.PORT || 80;

const isProductionConfiguration: boolean = process.env.NODE_ENV === 'production';
export const CONFIGURATION = {
  PRODUCTION: isProductionConfiguration,
  DEBUG: !isProductionConfiguration,
}

export const DOC_PATH = process.env.DOC_PATH ? `/${process.env.DOC_PATH}` : '/swagger';

export const LOGGING = true;
export const JWT_SECRET = process.env.JWT_SECRET || 'TOKEN';

export const RemoteServicesInfo: ServicesInfo = {
  UserService: {
    API_URL: process.env.USER_SERVICE_URL,
    TOKEN_USER_GROUP_VALIDATION_ROUTE: "/Authorization/role-in-group",
  },
};

const connectionInfo: ConnectionOptions = {
  ...config.database,
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD,
}

export const ORM_CONFIG: ConnectionOptions = {
  ...connectionInfo,
  synchronize: true,
  logging: false,
  entities: [
    Test,
    BaseEntity,
  ]
}

export const REDIS_CONFIG = {
  ...config.redis,
  password: process.env.REDIS_PASSWORD
}
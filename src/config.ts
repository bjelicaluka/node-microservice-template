import { ConnectionOptions } from 'typeorm';
import { BaseEntity } from "./model/BaseEntity";
import { Test } from './model/Test';

const config = JSON.parse(process.env.CONFIG);

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

export const DOC_PATH = process.env.DOC_PATH ? `/${process.env.DOC_PATH}` : '/explorer';

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
// TODO: add to readme
export const API_INFO = {
  API_PROTOCOL: process.env.API_PROTOCOL || 'http',
  API_HOSTNAME: process.env.API_HOSTNAME || 'localhost',
  API_PORT: process.env.API_PORT || 80,
  API_PREFIX: process.env.API_PREFIX ? `/${process.env.API_PREFIX}` : '/'
}

export const DOC_INFO = {
  EXPOSE_SWAGGER_UI: process.env.EXPOSE_SWAGGER_UI === 'true',
  EXPOSE_API_DOCS: process.env.EXPOSE_API_DOCS === 'true',
}
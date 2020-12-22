import * as express from "express";
import { Application } from 'express';
import { Server } from 'http';
import { Container } from 'inversify';
import { IAlarmEventDispatcher } from '../contracts/IAlarmEventDispatcher';
import { IInstaller } from "../contracts/IInstaller";
import { IAlarmRecordService } from '../contracts/Services/IAlarmRecordService';
import { IAlarmSensorService } from '../contracts/Services/IAlarmSensorService';
import { IAlarmService } from '../contracts/Services/IAlarmService';
import { IAuthService } from "../contracts/Services/proxy/IAuthService";
import { IUserService } from "../contracts/Services/proxy/IUserService";
import { AlarmController } from '../controllers/AlarmController';
import { AlarmRecordController } from '../controllers/AlarmRecordController';
import { AlarmSensorController } from '../controllers/AlarmSensorController';
import { AuthMiddlewareInstaller } from "../installers/AuthMiddlewareInstaller";
import { MiddlewareInstaller } from "../installers/MiddlewareInstaller";
import { RoutesInstaller } from "../installers/RoutesInstaller";
import { AlarmRecordService } from '../services/AlarmRecordService';
import { AlarmSensorService } from '../services/AlarmSensorService';
import { AlarmService } from '../services/AlarmService';
import { AuthServiceProxy } from "../services/proxy/AuthServiceProxy";
import { UserServiceProxy } from "../services/proxy/UserServiceProxy";
import { SocketIOServer } from '../event-dispatchers/SocketIOServer';
import { IAlarmCheckerService } from "../contracts/Services/IAlarmCheckerService";
import { AlarmCheckerService } from "../services/AlarmCheckerService";
import { SensorServiceProxy } from "../services/proxy/SensorServiceProxy";
import { ISensorService } from "../contracts/Services/proxy/ISensorService";
import { AlarmCheckerController } from "../controllers/AlarmCheckerController";

const AppContainer = new Container();

// Application and Server
AppContainer.bind<Application>("Application").toConstantValue(express());
AppContainer.bind<Server>(Server).toConstantValue(new Server(AppContainer.get<Application>("Application")));

// Installers
AppContainer.bind<IInstaller>("IInstaller").to(AuthMiddlewareInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(MiddlewareInstaller);
AppContainer.bind<IInstaller>("IInstaller").to(RoutesInstaller);

// Services
AppContainer.bind<IAlarmService>("IAlarmService").to(AlarmService).inRequestScope();
AppContainer.bind<IAlarmRecordService>("IAlarmRecordService").to(AlarmRecordService).inRequestScope();
AppContainer.bind<IAlarmSensorService>("IAlarmSensorService").to(AlarmSensorService).inRequestScope();
AppContainer.bind<IAlarmCheckerService>("IAlarmCheckerService").to(AlarmCheckerService).inRequestScope();

// Proxy Services 
AppContainer.bind<IAuthService>("IAuthService").to(AuthServiceProxy).inRequestScope();
AppContainer.bind<IUserService>("IUserService").to(UserServiceProxy).inRequestScope();
AppContainer.bind<ISensorService>("ISensorService").to(SensorServiceProxy).inRequestScope();

// Controllers
AppContainer.bind<AlarmController>(AlarmController).toSelf();
AppContainer.bind<AlarmRecordController>(AlarmRecordController).toSelf();
AppContainer.bind<AlarmSensorController>(AlarmSensorController).toSelf();
AppContainer.bind<AlarmCheckerController>(AlarmCheckerController).toSelf();

// Event Dispatcher
AppContainer.bind<IAlarmEventDispatcher>("IAlarmEventDispatcher").to(SocketIOServer).inSingletonScope();

export { AppContainer };
